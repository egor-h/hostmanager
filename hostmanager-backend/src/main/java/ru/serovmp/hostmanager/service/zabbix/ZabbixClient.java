package ru.serovmp.hostmanager.service.zabbix;

import lombok.extern.slf4j.Slf4j;
import org.springframework.web.client.RestTemplate;
import ru.serovmp.hostmanager.restentities.request.MethodNameable;
import ru.serovmp.hostmanager.restentities.request.ZabbixBaseRequest;

import java.util.Map;
import java.util.concurrent.atomic.AtomicLong;

@Slf4j
public class ZabbixClient {
    private static final String RPC_PATH = "/api_jsonrpc.php";
    private String host;
    private RestTemplate rest;

    public ZabbixClient(String host, RestTemplate rest) {
        this.host = host;
        this.rest = rest;
    }

    public <T extends MethodNameable, R> R request(T request, Class<R> responseClass, long requestId, String auth) {
        var resp = rest.postForEntity(host+RPC_PATH, ZabbixBaseRequest.baseRequest(requestId, auth, request), responseClass);
        log.info("Response {}", resp);
        return resp.getBody();
    }
}
