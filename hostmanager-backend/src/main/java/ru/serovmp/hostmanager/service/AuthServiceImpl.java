package ru.serovmp.hostmanager.service;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import ru.serovmp.hostmanager.dto.AuthResultDto;
import ru.serovmp.hostmanager.dto.UserDto;
import ru.serovmp.hostmanager.entity.Role;
import ru.serovmp.hostmanager.entity.User;
import ru.serovmp.hostmanager.repository.UserRepository;
import ru.serovmp.hostmanager.security.JwtUtils;

import java.util.stream.Collectors;

@Service
public class AuthServiceImpl implements AuthService {
    private UserDetailsServiceImpl users;
    private JwtUtils jwtUtils;
    private AuthenticationManager am;
    private UserRepository userRepository;
    private PasswordEncoder passwordEncoder;
    private SettingsService settingsService;
    private InfoService infoService;

    public AuthServiceImpl(UserDetailsServiceImpl users, JwtUtils jwtUtils, AuthenticationManager am, UserRepository userRepository, PasswordEncoder passwordEncoder, SettingsService settingsService, InfoService infoService) {
        this.users = users;
        this.jwtUtils = jwtUtils;
        this.am = am;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.settingsService = settingsService;
        this.infoService = infoService;
    }

    @Override
    public AuthResultDto login(String username, String password) {
        try {
            Authentication auth = new UsernamePasswordAuthenticationToken(username, password);
            am.authenticate(auth);
            String token = jwtUtils.createToken(users.loadUserByUsername(username));
            User user = userRepository.findByLogin(username).orElseThrow(() -> new RuntimeException("user not found"));
            return new AuthResultDto(token, UserDto.builder()
                    .id(user.getId())
                    .email(user.getEmail())
                    .login(user.getLogin())
                    .name(user.getName())
                    .roles(user.getRoles().stream().map(Role::getId).collect(Collectors.toSet()))
                    .build(),
                    settingsService.getSettingsForUser(user.getId()),
                    infoService.info(),
                    infoService.serviceCapabilities());
        } catch (AuthenticationException e) {
            throw new BadCredentialsException(username);
        }
    }
}
