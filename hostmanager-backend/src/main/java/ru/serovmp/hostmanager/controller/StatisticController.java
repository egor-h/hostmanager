package ru.serovmp.hostmanager.controller;

import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.serovmp.hostmanager.controller.form.SubnetForm;
import ru.serovmp.hostmanager.service.StatisticService;

@SecurityRequirement(name = "bearer-key")
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

    @GetMapping("/subnets/spaces")
    public ResponseEntity subnetsWithSpaces() {
        return ResponseEntity.ok(statisticService.subnetsIntervals());
    }

    @GetMapping("/subnets/manage")
    public ResponseEntity getStoredSubnets() {
        return ResponseEntity.ok(statisticService.subnets());
    }

    @PostMapping("/subnets/manage")
    public ResponseEntity createSubnet(@RequestBody SubnetForm subnet) {
        return ResponseEntity.ok(statisticService.createSubnet(subnet));
    }

    @PutMapping("/subnets/manage/{id}")
    public ResponseEntity changeSubnet(@PathVariable("id") long id, @RequestBody SubnetForm subnet) {
        return ResponseEntity.ok(statisticService.updateSubnet(id, subnet));
    }

    @DeleteMapping("/subnets/manage/{id}")
    public ResponseEntity deleteSubnet(@PathVariable("id") long id) {
        statisticService.deleteSubnet(id);
        return ResponseEntity.ok().build();
    }
}
