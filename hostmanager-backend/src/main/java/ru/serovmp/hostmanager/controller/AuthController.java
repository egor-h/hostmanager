package ru.serovmp.hostmanager.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import ru.serovmp.hostmanager.controller.form.AuthForm;
import ru.serovmp.hostmanager.controller.form.RegistrationForm;
import ru.serovmp.hostmanager.dto.AuthResultDto;
import ru.serovmp.hostmanager.dto.UserDto;
import ru.serovmp.hostmanager.entity.Role;
import ru.serovmp.hostmanager.entity.User;
import ru.serovmp.hostmanager.repository.UserRepository;
import ru.serovmp.hostmanager.security.JwtUtils;
import ru.serovmp.hostmanager.service.SettingsService;
import ru.serovmp.hostmanager.service.UserDetailsServiceImpl;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/auth")
public class AuthController {
    private UserDetailsServiceImpl users;
    private JwtUtils jwtUtils;
    private AuthenticationManager am;
    private UserRepository userRepository;
    private PasswordEncoder passwordEncoder;
    private SettingsService settingsService;

    @Autowired
    public AuthController(UserDetailsServiceImpl users, JwtUtils jwtUtils, AuthenticationManager am, UserRepository userRepository, PasswordEncoder passwordEncoder, SettingsService settingsService) {
        this.users = users;
        this.jwtUtils = jwtUtils;
        this.am = am;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.settingsService = settingsService;
    }

    @PostMapping("/login")
    public ResponseEntity login(@RequestBody AuthForm signinForm) {
        try {
            Authentication auth = new UsernamePasswordAuthenticationToken(signinForm.getUsername(), signinForm.getPassword());
            am.authenticate(auth);
            String token = jwtUtils.createToken(users.loadUserByUsername(signinForm.getUsername()));
            User user = userRepository.findByLogin(signinForm.getUsername()).orElseThrow(() -> new RuntimeException("user not found"));
            return ResponseEntity.ok(new AuthResultDto(token, UserDto.builder()
                    .id(user.getId())
                    .email(user.getEmail())
                    .login(user.getLogin())
                    .name(user.getName())
                    .roles(user.getRoles().stream().map(Role::getId).collect(Collectors.toSet()))
                    .build(),
                    settingsService.getSettingsForUser(user.getId())));
        } catch (AuthenticationException e) {
            throw new BadCredentialsException(signinForm.getUsername());
        }
    }

    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity handle(RuntimeException e) {
        if (e instanceof BadCredentialsException) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        e.printStackTrace();
        return ResponseEntity.noContent().build();
    }

}

