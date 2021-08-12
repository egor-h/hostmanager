package ru.serovmp.hostmanager.validation;


import ru.serovmp.hostmanager.entity.Protocol;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;
import java.util.Arrays;

public class LaunchTypeValidator implements ConstraintValidator<LaunchTypeConstraint, String> {

    @Override
    public boolean isValid(String launchType, ConstraintValidatorContext constraintValidatorContext) {
        return Arrays.stream(Protocol.LaunchType.values())
                .filter(lt -> lt.name().equals(launchType))
                .findFirst().isPresent();
    }
}
