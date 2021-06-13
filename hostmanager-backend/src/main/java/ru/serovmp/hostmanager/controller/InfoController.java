package ru.serovmp.hostmanager.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/info")
public class InfoController {

    @Value("${hostsmanager.service-info.admin-email}")
    private String adminEmail;

    @Value("${hostsmanager.service-info.location}")
    private String serviceLocation;

    @Value("${hostsmanager.service-info.description}")
    private String description;

    @GetMapping
    public Map info() {
        return Map.of(
                "adminEmail", adminEmail,
                "location", serviceLocation,
                "description", description
        );
    }

}
