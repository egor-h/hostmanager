package ru.serovmp.hostmanager.dto;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
public class ProtocolDto {
    private long id;
    private String name;
    private String executionLine;
    private String launchType;
}
