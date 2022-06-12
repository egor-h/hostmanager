package ru.serovmp.hostmanager.service.zabbix;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.client.RestTemplate;
import ru.serovmp.hostmanager.config.ZabbixConfigurationProperties;
import ru.serovmp.hostmanager.dto.HostDto;
import ru.serovmp.hostmanager.restentities.request.ZabbixAuthRequest;
import ru.serovmp.hostmanager.restentities.request.ZabbixCreateHostRequest;
import ru.serovmp.hostmanager.restentities.request.ZabbixGroupsRequest;
import ru.serovmp.hostmanager.restentities.request.ZabbixHostsRequest;
import ru.serovmp.hostmanager.restentities.response.ZabbixAuthResponse;
import ru.serovmp.hostmanager.restentities.response.ZabbixCreateHostResponse;
import ru.serovmp.hostmanager.restentities.response.ZabbixGroupResponse;
import ru.serovmp.hostmanager.restentities.response.ZabbixHostsResponse;
import ru.serovmp.hostmanager.service.HostService;
import ru.serovmp.hostmanager.service.HostServiceImpl;

import javax.annotation.PostConstruct;
import java.util.List;
import java.util.Set;
import java.util.concurrent.atomic.AtomicLong;
import java.util.stream.Collectors;

import static java.util.stream.Collectors.toList;

@Slf4j
public class ZabbixServiceImpl implements ZabbixService {
    private AtomicLong requestId = new AtomicLong(1);
    private RestTemplate rest = new RestTemplate();
    private ZabbixClient client;

    private HostService hostService;
    private ZabbixConfigurationProperties zabbixConfig;

    private String apiKey = null;

    @Autowired
    public ZabbixServiceImpl(ZabbixConfigurationProperties zabbixConfig, HostService hostService) {
        this.hostService = hostService;
        this.zabbixConfig = zabbixConfig;
        client = new ZabbixClient(zabbixConfig.getUrl(), rest);
    }

    @PostConstruct
    void init() {
        authToZabbix();
        log.info("Connected to zabbix on {}", zabbixConfig.getUrl());
    }

    public void authToZabbix() {
        var request = new ZabbixAuthRequest(zabbixConfig.getLogin(), zabbixConfig.getPassword());
        var response = client.request(request, ZabbixAuthResponse.class, requestId.getAndIncrement(), apiKey);
        apiKey = response.getResult();
    }


    public List<ZabbixGroupResponse.Result> groups() {
        var request = new ZabbixGroupsRequest("extend");
        var response = client.request(request, ZabbixGroupResponse.class, requestId.getAndIncrement(), apiKey);
        return response.getResult();
    }

    public ZabbixCreateHostResponse createHost(ZabbixCreateHostRequest request) {
        return client.request(request, ZabbixCreateHostResponse.class, requestId.getAndIncrement(), apiKey);
    }

    private ZabbixHostsResponse getHostsOfGroup(String zabbixGroupId) {
        var request = new ZabbixHostsRequest(List.of(zabbixGroupId), List.of("hostid", "host", "name"), List.of("interfaceid", "ip"));
        var response = client.request(request, ZabbixHostsResponse.class, requestId.getAndIncrement(), apiKey);
        return response;
    }

    public List<ZabbixCreateHostResponse> syncGroup(long hostManagerGroupId, String zabbixGroupId, boolean dontAddExisted) {
        log.trace("Syncing group with hostManagerGroupId {} zabbixGroupId {} dontAddExisted {}",
                hostManagerGroupId, zabbixGroupId, dontAddExisted);
        var hosts = hostService.getTree(hostManagerGroupId).getChildren();
        ZabbixHostsResponse response = getHostsOfGroup(zabbixGroupId);

        Set<String> usedAddressses = response.getResult().stream()
                .flatMap(host -> host.getInterfaces().stream().map(itf -> itf.getIp()))
                .collect(Collectors.toSet());

        var preparedHosts = hosts.stream()
                .filter(host -> dontAddExisted && !usedAddressses.contains(host.getAddress()))
                .map((HostDto host) -> {
                    var itf = new ZabbixCreateHostRequest.Interface(1, 1, 1, host.getAddress(), "", "10050");
                    var group = new ZabbixCreateHostRequest.Group(zabbixGroupId);
                    return new ZabbixCreateHostRequest("host"+host.getId(), host.getName(), List.of(itf), List.of(group));
                }).collect(toList());

        return preparedHosts.stream().map(this::createHost).collect(Collectors.toList());
    }
}
