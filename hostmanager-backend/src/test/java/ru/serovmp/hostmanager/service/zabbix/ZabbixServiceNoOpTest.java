package ru.serovmp.hostmanager.service.zabbix;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import ru.serovmp.hostmanager.restentities.request.ZabbixCreateHostRequest;
import ru.serovmp.hostmanager.restentities.response.ZabbixGroupResponse;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertDoesNotThrow;
import static org.junit.jupiter.api.Assertions.assertEquals;

class ZabbixServiceNoOpTest {

    ZabbixServiceNoOp zabbixService = new ZabbixServiceNoOp();

    @Test
    void init_methodCall_nothingIsThrown() {
        assertDoesNotThrow(() -> zabbixService.init());
    }

    @Test
    void authToZabbix_methodCall_nothingIsThrown() {
        assertDoesNotThrow(() -> zabbixService.authToZabbix());
    }

    @Test
    void groups_methodCall_emptyListReturned() {
        List<ZabbixGroupResponse.Result> responseList = zabbixService.groups();
        assertEquals(0, responseList.size());
    }

    @Test
    void createHost_methodCall_emptyCreatedHostsList() {
        var emptyHost = new ZabbixCreateHostRequest("", "", List.of(), List.of());
        var createdHosts = zabbixService.createHost(emptyHost);

        assertEquals(0, createdHosts.getHostIds().size());
    }

    @Test
    void syncGroup_methodCall_emptyResponseReturned() {
        var syncResult = zabbixService.syncGroup(0, "", false);

        assertEquals(1, syncResult.size());
        assertEquals(0, syncResult.get(0).getHostIds().size());
    }
}