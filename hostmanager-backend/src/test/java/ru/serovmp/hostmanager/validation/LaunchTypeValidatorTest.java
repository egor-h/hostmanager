package ru.serovmp.hostmanager.validation;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;
import ru.serovmp.hostmanager.controller.form.ProtocolForm;

import javax.validation.ConstraintViolation;
import javax.validation.Validation;
import javax.validation.Validator;
import javax.validation.ValidatorFactory;

import java.util.Set;

import static org.junit.jupiter.api.Assertions.*;

class LaunchTypeValidatorTest {

    public static Validator validator;

    static {
        ValidatorFactory validatorFactory = Validation.buildDefaultValidatorFactory();
        validator = validatorFactory.usingContext().getValidator();
    }

    public static ProtocolForm proto(String launchType) {
        return new ProtocolForm("", "", launchType, "", 0);
    }

    @ParameterizedTest
    @ValueSource(strings = {"JUST_RUN", "VALIDATE_EXITCODE", "VALIDATE_OUTPUT", "PRINT_OUTPUT", "INTERNAL"})
    void validateLaunchType_correctLaunchType_noError(String input) {
        var proto = proto(input);
        Set<ConstraintViolation<ProtocolForm>> violations = validator.validate(proto);
        assertEquals(0, violations.size());
    }

    @Test
    void validateLaunchType_wrongLaunchType_error() {
        var proto = proto("SOME_PROTOCOL");
        Set<ConstraintViolation<ProtocolForm>> violations = validator.validate(proto);
        assertEquals(1, violations.size());
    }
}