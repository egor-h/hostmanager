package ru.serovmp.hostmanager.validation;

import lombok.AllArgsConstructor;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;

import javax.validation.ConstraintViolation;
import javax.validation.Validation;
import javax.validation.Validator;
import javax.validation.ValidatorFactory;


import java.util.Set;

import static org.junit.jupiter.api.Assertions.*;

class SettingKeyValidatorTest {

    static Validator validator;
    static {
        ValidatorFactory validatorFactory = Validation.buildDefaultValidatorFactory();
        validator = validatorFactory.usingContext().getValidator();
    }

    @AllArgsConstructor
    public static class SettingKey {
        @SettingKeyConstraint
        public String key;
    }

    @ParameterizedTest
    @ValueSource(strings = {"expandTreeOnStartup", "rootNode"})
    void validateSettingKey_correctKeyPassed_noError(String input) {
        var key = new SettingKey(input);
        Set<ConstraintViolation<SettingKey>> violations = validator.validate(key);
        assertEquals(0, violations.size());
    }

    @ParameterizedTest
    @ValueSource(strings = {"ExpandTreeOnStartup", "RootNode"})
    void validateSettingKey_wrongCasedCorrectKeys_errorExpected(String input) {
        var key = new SettingKey(input);
        Set<ConstraintViolation<SettingKey>> violations = validator.validate(key);
        assertEquals(1, violations.size());
    }

    @ParameterizedTest
    @ValueSource(strings = {"someWrongKey", "SomeWrongKey"})
    void validateSettingKey_wrongKeys_errorExpected(String input) {
        var key = new SettingKey(input);
        Set<ConstraintViolation<SettingKey>> violations = validator.validate(key);
        assertEquals(1, violations.size());
    }
}