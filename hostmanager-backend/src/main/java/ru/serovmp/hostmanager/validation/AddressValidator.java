package ru.serovmp.hostmanager.validation;

import lombok.extern.slf4j.Slf4j;
import ru.serovmp.hostmanager.util.IPUtils;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;
import java.util.regex.Pattern;

@Slf4j
public class AddressValidator implements ConstraintValidator<HostAddressConstraint, String> {
    public static final Pattern HTTP_HTTPS_URL = Pattern.compile("^https?://.*\\..*$");

    @Override
    public boolean isValid(String address, ConstraintValidatorContext constraintValidatorContext) {
        log.trace("Validate {}", address);
        boolean isIpv4 = IPUtils.isValid(address);
        boolean isDns = HTTP_HTTPS_URL.matcher(address).find();
        return isIpv4 || isDns;
    }
}
