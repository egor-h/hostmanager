package ru.serovmp.hostmanager.service.zabbix;

import lombok.extern.slf4j.Slf4j;
import ru.serovmp.hostmanager.restentities.request.ZabbixCreateHostRequest;
import ru.serovmp.hostmanager.restentities.response.ZabbixCreateHostResponse;
import ru.serovmp.hostmanager.restentities.response.ZabbixGroupResponse;

import java.util.List;

@Slf4j
public class ZabbixServiceNoOp implements ZabbixService {

    public void init() {
        log.info("Loaded Noop zabbix service");
    }

    @Override
    public void authToZabbix() {

    }

    @Override
    public List<ZabbixGroupResponse.Result> groups() {
        return List.of();
    }

    @Override
    public ZabbixCreateHostResponse createHost(ZabbixCreateHostRequest request) {
        return new ZabbixCreateHostResponse(List.of());
    }

    @Override
    public List<ZabbixCreateHostResponse> syncGroup(long hostManagerGroupId, String zabbixGroupId, boolean dontAddExisted) {
        return List.of(new ZabbixCreateHostResponse(List.of()));
    }
}
