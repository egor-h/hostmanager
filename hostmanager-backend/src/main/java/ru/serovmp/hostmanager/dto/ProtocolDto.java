package ru.serovmp.hostmanager.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class ProtocolDto {
    private long id;
    private String name;
    private String executionLine;
    private String launchType;
    private String validationRegex;
    private long expectedExitCode;
}
