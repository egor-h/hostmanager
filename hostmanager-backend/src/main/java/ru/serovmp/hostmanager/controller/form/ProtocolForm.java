package ru.serovmp.hostmanager.controller.form;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter @Setter
public class ProtocolForm {
    private String name;
    private String executionLine;
    private String launchType;
    private String validationRegex;
    private long expectedExitCode;
}
