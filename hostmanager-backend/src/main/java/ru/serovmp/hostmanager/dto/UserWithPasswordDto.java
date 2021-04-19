package ru.serovmp.hostmanager.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class UserWithPasswordDto {
    private long id;
    private String login;
    private String name;
    private String email;
    private String password;
    private Set<Long> roles;
}
