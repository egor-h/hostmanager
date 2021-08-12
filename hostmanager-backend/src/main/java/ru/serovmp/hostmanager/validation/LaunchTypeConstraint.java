package ru.serovmp.hostmanager.validation;

import javax.validation.Constraint;
import javax.validation.Payload;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Retention(RetentionPolicy.RUNTIME)
@Target({ElementType.METHOD, ElementType.FIELD})
@Constraint(validatedBy = LaunchTypeValidator.class)
public @interface LaunchTypeConstraint {
    String message() default "Launch type doesn't match allowed values";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
}
