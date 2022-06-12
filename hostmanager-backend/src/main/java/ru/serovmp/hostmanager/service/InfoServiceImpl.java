package ru.serovmp.hostmanager.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import ru.serovmp.hostmanager.dto.ServiceCapabilitiesDto;
import ru.serovmp.hostmanager.dto.ServiceInfoDto;
import ru.serovmp.hostmanager.service.zabbix.ZabbixService;
import ru.serovmp.hostmanager.service.zabbix.ZabbixServiceNoOp;

@Service
public class InfoServiceImpl implements InfoService {

    @Value("${hostsmanager.service-info.admin-email}")
    private String adminEmail;

    @Value("${hostsmanager.service-info.location}")
    private String serviceLocation;

    @Value("${hostsmanager.service-info.description}")
    private String description;

    ZabbixService zabbixService;

    @Autowired
    public InfoServiceImpl(ZabbixService zabbixService) {
        this.zabbixService = zabbixService;
    }

    @Override
    public ServiceInfoDto info() {
        return new ServiceInfoDto(adminEmail, serviceLocation, description);
    }

    @Override
    public ServiceCapabilitiesDto serviceCapabilities() {
        return new ServiceCapabilitiesDto(
                !(zabbixService instanceof ZabbixServiceNoOp),
                false,
                false
        );
    }
}
