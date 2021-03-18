package ru.serovmp.hostmanager.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.client.RestTemplate;
import ru.serovmp.hostmanager.config.ZabbixConfigurationProperties;
import ru.serovmp.hostmanager.restentities.request.ZabbixAuthRequest;
import ru.serovmp.hostmanager.restentities.request.ZabbixBaseRequest;
import ru.serovmp.hostmanager.restentities.request.ZabbixGroupsRequest;
import ru.serovmp.hostmanager.restentities.response.ZabbixAuthResponse;
import ru.serovmp.hostmanager.restentities.response.ZabbixBaseResponse;
import ru.serovmp.hostmanager.restentities.response.ZabbixGroupResponse;

import javax.annotation.PostConstruct;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.concurrent.atomic.AtomicLong;
import java.util.stream.Collectors;

@Service
@Slf4j
public class ZabbixService {
    private AtomicLong requestId = new AtomicLong(1);
    private RestTemplate rest = new RestTemplate();

    private ZabbixConfigurationProperties zabbixConfig;

    private String apiKey = null;

    @Autowired
    public ZabbixService(ZabbixConfigurationProperties zabbixConfig) {
        this.zabbixConfig = zabbixConfig;
    }

    @PostConstruct
    void init() {
        authToZabbix();
        groups();
    }

    private ZabbixBaseRequest getRequest(String method, Object body) {
        return ZabbixBaseRequest.baseRequest(
                method, requestId.getAndIncrement(), apiKey, body);
    }

    public void authToZabbix() {
        var request = getRequest("user.login", new ZabbixAuthRequest(zabbixConfig.getLogin(), zabbixConfig.getPassword()));
        log.debug("Zabbix auth: {}", request);
        ZabbixBaseResponse<String> result = rest.postForObject(zabbixConfig.getUrl(), request, ZabbixBaseResponse.class);
        apiKey = result.getResult();
        log.debug("Zabbix auth result: {}", result);
    }

    public void groups() {
        var request = getRequest("hostgroup.get", new ZabbixGroupsRequest("extend"));
        ZabbixBaseResponse<List<ZabbixGroupResponse>> result = rest.postForObject(zabbixConfig.getUrl(), request, ZabbixBaseResponse.class);
        log.debug(String.join(", ", result.getResult().stream().map(g -> g.toString()).collect(Collectors.toList())));
    }

}
