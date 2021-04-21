package ru.serovmp.hostmanager.service.zabbix;

import ru.serovmp.hostmanager.restentities.request.ZabbixCreateHostRequest;
import ru.serovmp.hostmanager.restentities.response.ZabbixCreateHostResponse;
import ru.serovmp.hostmanager.restentities.response.ZabbixGroupResponse;

import java.util.List;

public interface ZabbixService {
    void authToZabbix();
    List<ZabbixGroupResponse.Result> groups();
    ZabbixCreateHostResponse createHost(ZabbixCreateHostRequest request);
    List<ZabbixCreateHostResponse> syncGroup(long hostManagerGroupId, String zabbixGroupId, boolean dontAddExisted);
}
