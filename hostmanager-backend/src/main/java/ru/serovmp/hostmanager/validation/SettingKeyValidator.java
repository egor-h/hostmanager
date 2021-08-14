package ru.serovmp.hostmanager.validation;

import ru.serovmp.hostmanager.dto.SettingsDto;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

public class SettingKeyValidator implements ConstraintValidator<SettingKeyConstraint, String> {
    @Override
    public boolean isValid(String key, ConstraintValidatorContext constraintValidatorContext) {
        return SettingsDto.KEY_FIELDS.contains(key);
    }
}
