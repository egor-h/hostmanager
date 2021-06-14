package ru.serovmp.hostmanager.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ServiceCapabilitiesDto {
    private boolean zabbix;
    private boolean serverSideAvailability;
    private boolean mapping;
}
