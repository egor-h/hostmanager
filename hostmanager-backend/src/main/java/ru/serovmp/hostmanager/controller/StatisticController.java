package ru.serovmp.hostmanager.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ru.serovmp.hostmanager.dto.StatisticsDto;
import ru.serovmp.hostmanager.service.StatisticService;

@RequestMapping("/api/v1/stats")
@RestController
public class StatisticController {

    private StatisticService statisticService;

    @Autowired
    public StatisticController(StatisticService statisticService) {
        this.statisticService = statisticService;
    }

    @GetMapping("/tags")
    public void statsByTags() {

    }

    @GetMapping("/subnets")
    public ResponseEntity statsBySubnets() {
        return ResponseEntity.ok(statisticService.ipAddressStatistics());
    }
}
