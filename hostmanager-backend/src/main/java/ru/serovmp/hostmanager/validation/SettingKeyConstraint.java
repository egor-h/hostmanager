package ru.serovmp.hostmanager.validation;

import javax.validation.Constraint;
import javax.validation.Payload;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Retention(RetentionPolicy.RUNTIME)
@Target({ElementType.FIELD, ElementType.METHOD})
@Constraint(validatedBy = SettingKeyValidator.class)
public @interface SettingKeyConstraint {
    String message() default "Unsupported setting key";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
}
