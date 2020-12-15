package ru.serovmp.hostmanager.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import ru.serovmp.hostmanager.dto.HostStatsDto;
import ru.serovmp.hostmanager.dto.RecentHostDto;
import ru.serovmp.hostmanager.service.HostService;

import java.util.List;

@RestController
@RequestMapping("/api/v1/recent")
public class RecentActionsController {

    private HostService hostService;

    @Autowired
    public RecentActionsController(HostService hostService) {
        this.hostService = hostService;
    }

    @GetMapping("/objects")
    public List<RecentHostDto> recentObjects() {
        int limit = 10;
        return this.hostService.recent(limit);
    }

    @GetMapping("/stats")
    public HostStatsDto stats() {
        return this.hostService.stats();
    }
}
