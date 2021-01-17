package ru.serovmp.hostmanager.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequestMapping("/api/v1/zabbix")
@RestController
public class ZabbixController {

    @GetMapping
    public ResponseEntity getGroups() {
        return ResponseEntity.ok().build();
    }

    @GetMapping("/{hostsManagerId}/to/{zabbixGroupId}")
    public ResponseEntity export(@PathVariable long hostsManagerId, @PathVariable long zabbixGroupId, @RequestParam("merge") boolean mergeExistingEntries) {
        return ResponseEntity.ok().build();
    }

    @GetMapping("/exportStatus")
    public ResponseEntity exportStatus() {
        return ResponseEntity.ok().build();
    }
}
