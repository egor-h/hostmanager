package ru.serovmp.hostmanager.validation;

import org.apache.tomcat.util.bcel.Const;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import ru.serovmp.hostmanager.controller.form.HostForm;
import ru.serovmp.hostmanager.dto.HostDto;

import javax.validation.ConstraintViolation;
import javax.validation.Validation;
import javax.validation.Validator;
import javax.validation.ValidatorFactory;

import java.util.Set;

import static org.junit.jupiter.api.Assertions.*;


class AddressValidatorTest {
    private static Validator validator;
    static {
        ValidatorFactory validatorFactory = Validation.buildDefaultValidatorFactory();
        validator = validatorFactory.usingContext().getValidator();
    }

    public static HostForm host(String address) {
        return HostForm.builder().address(address).build();
    }

    @Test
    void validateAddress_correctAddress_noErrors() {
        var host = host("192.168.0.1");
        Set<ConstraintViolation<HostForm>> violations = validator.validate(host);
        assertEquals(0, violations.size());
    }

    @ParameterizedTest
    @ValueSource(strings = {"http://somedomain.net", "https://somehttpsdomain.net", "https://some.sub.domains.somedomain.coffee"})
    void validateAddress_correctHttpDnsName_noErrors(String input) {
        var host = host(input);
        Set<ConstraintViolation<HostForm>> violations = validator.validate(host);
        assertEquals(0, violations.size());
    }

    @ParameterizedTest
    @ValueSource(strings = {"somedomain.net", "htp://domainasd.net", "https://wrongdomain"})
    void validateAddress_notDnsName_errorsExpected(String input) {
        var host = host(input);
        Set<ConstraintViolation<HostForm>> violations = validator.validate(host);
        assertEquals(1, violations.size());
    }
}