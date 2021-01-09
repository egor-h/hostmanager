package ru.serovmp.hostmanager.controller.form;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RegistrationForm {
    private String username;
    private String email;
    private String name;
    private String password;
}

