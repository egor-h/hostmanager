package ru.serovmp.hostmanager.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ServiceInfoDto {
    private String adminEmail;
    private String location;
    private String description;
}
