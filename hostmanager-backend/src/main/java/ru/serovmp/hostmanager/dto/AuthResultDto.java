package ru.serovmp.hostmanager.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class AuthResultDto {
    private String token;
    private UserDto user;
    private SettingsDto settings;
    private ServiceInfoDto serviceInfo;
    private ServiceCapabilitiesDto serviceCapabilities;
}
