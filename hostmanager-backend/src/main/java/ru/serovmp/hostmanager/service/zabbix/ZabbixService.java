package ru.serovmp.hostmanager.service.zabbix;

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
    private ZabbixClient client;

    private ZabbixConfigurationProperties zabbixConfig;

    private String apiKey = null;

    @Autowired
    public ZabbixService(ZabbixConfigurationProperties zabbixConfig) {
        this.zabbixConfig = zabbixConfig;
        client = new ZabbixClient(zabbixConfig.getUrl(), rest);
    }

    @PostConstruct
    void init() {
        authToZabbix();
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
}
