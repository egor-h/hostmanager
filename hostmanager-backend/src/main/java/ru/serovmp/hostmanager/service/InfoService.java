package ru.serovmp.hostmanager.service;

import ru.serovmp.hostmanager.dto.ServiceCapabilitiesDto;
import ru.serovmp.hostmanager.dto.ServiceInfoDto;

public interface InfoService {
    ServiceInfoDto info();

    ServiceCapabilitiesDto serviceCapabilities();
}
