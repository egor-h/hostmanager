package ru.serovmp.hostmanager.controller;

import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ru.serovmp.hostmanager.dto.HomePageDto;
import ru.serovmp.hostmanager.dto.RecentHostDto;
import ru.serovmp.hostmanager.service.HostService;

import java.util.List;

@SecurityRequirement(name = "bearer-key")
@RestController
@RequestMapping("/api/v1/welcome")
public class HomePageController {
    private static final int RECENT_HOSTS_LIMIT = 10;

    private HostService hostService;

    @Autowired
    public HomePageController(HostService hostService) {
        this.hostService = hostService;
    }

    @GetMapping
    public HomePageDto root() {
        return HomePageDto.builder()
                .recents(hostService.recent(RECENT_HOSTS_LIMIT))
                .hostsTotal(hostService.stats())
                .build();
    }

    @GetMapping("/objects")
    public List<RecentHostDto> recentObjects() {
        int limit = 10;
        return this.hostService.recent(limit);
    }
}
