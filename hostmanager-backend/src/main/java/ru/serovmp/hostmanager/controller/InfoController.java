package ru.serovmp.hostmanager.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ru.serovmp.hostmanager.dto.ServiceCapabilitiesDto;
import ru.serovmp.hostmanager.dto.ServiceInfoDto;
import ru.serovmp.hostmanager.service.InfoService;
import ru.serovmp.hostmanager.service.InfoServiceImpl;

@RestController
@RequestMapping("/info")
public class InfoController {

    private InfoService infoService;

    @Autowired
    public InfoController(InfoService infoService) {
        this.infoService = infoService;
    }

    @GetMapping("/info")
    public ServiceInfoDto info() {
        return infoService.info();
    }

    @GetMapping("/capabilities")
    public ServiceCapabilitiesDto serviceCapabilities() {
        return infoService.serviceCapabilities();
    }

}
