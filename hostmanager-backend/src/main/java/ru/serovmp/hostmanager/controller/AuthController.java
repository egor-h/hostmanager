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
import ru.serovmp.hostmanager.dto.AuthResultDto;
import ru.serovmp.hostmanager.dto.UserDto;
import ru.serovmp.hostmanager.entity.Role;
import ru.serovmp.hostmanager.entity.User;
import ru.serovmp.hostmanager.repository.UserRepository;
import ru.serovmp.hostmanager.security.JwtUtils;
import ru.serovmp.hostmanager.service.AuthService;
import ru.serovmp.hostmanager.service.InfoService;
import ru.serovmp.hostmanager.service.SettingsService;
import ru.serovmp.hostmanager.service.UserDetailsServiceImpl;

import java.util.stream.Collectors;

@RestController
@RequestMapping("/auth")
public class AuthController {
    private AuthService authService;

    @Autowired
    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/login")
    public ResponseEntity login(@RequestBody AuthForm signinForm) {
        return ResponseEntity.ok(authService.login(signinForm.getUsername(), signinForm.getPassword()));
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

