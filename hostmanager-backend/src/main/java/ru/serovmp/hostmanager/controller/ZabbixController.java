package ru.serovmp.hostmanager.controller;

import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.serovmp.hostmanager.service.zabbix.ZabbixService;

@SecurityRequirement(name = "bearer-key")
@RequestMapping("/api/v1/zabbix")
@RestController
public class ZabbixController {

    ZabbixService zabbixService;

    @Autowired
    public ZabbixController(ZabbixService zabbixService) {
        this.zabbixService = zabbixService;
    }

    @GetMapping
    public ResponseEntity getGroups() {
        return ResponseEntity.ok(zabbixService.groups());
    }

    @GetMapping("/{hostsManagerId}/to/{zabbixGroupId}")
    public ResponseEntity export(@PathVariable long hostsManagerId, @PathVariable long zabbixGroupId, @RequestParam("merge") boolean mergeExistingEntries) {
        var added = zabbixService.syncGroup(hostsManagerId, String.valueOf(zabbixGroupId), mergeExistingEntries);
        return ResponseEntity.ok(added);
    }

    @GetMapping("/exportStatus")
    public ResponseEntity exportStatus() {
        return ResponseEntity.ok().build();
    }

}
