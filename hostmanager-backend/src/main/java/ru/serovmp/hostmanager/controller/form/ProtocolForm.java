package ru.serovmp.hostmanager.controller.form;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import ru.serovmp.hostmanager.validation.LaunchTypeConstraint;

@AllArgsConstructor
@NoArgsConstructor
@Getter @Setter
public class ProtocolForm {
    private String name;
    private String executionLine;
    @LaunchTypeConstraint
    private String launchType;
    private String validationRegex;
    private long expectedExitCode;
}
