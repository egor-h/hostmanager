package ru.serovmp.hostmanager.controller.form;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class UserForm {
    private String login;
    private String email;
    private String name;
    private String password;
    private List<Long> roles;
}

