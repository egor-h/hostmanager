package ru.serovmp.hostmanager.controller;


import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import ru.serovmp.hostmanager.controller.form.UserForm;
import ru.serovmp.hostmanager.entity.User;
import ru.serovmp.hostmanager.repository.RoleRepository;
import ru.serovmp.hostmanager.repository.UserRepository;
import ru.serovmp.hostmanager.service.SettingsService;
import ru.serovmp.hostmanager.service.SettingsServiceImpl;
import ru.serovmp.hostmanager.util.EntityToDtoMapper;

import java.util.HashSet;

import static java.util.stream.Collectors.toSet;

@SecurityRequirement(name = "bearer-key")
@RequestMapping("/api/v1/users")
@RestController
public class UserController {

    private UserRepository userRepository;
    private RoleRepository roleRepository;
    private PasswordEncoder passwordEncoder;
    private SettingsService settingsService;
    private EntityToDtoMapper entityToDtoMapper;

    @Autowired
    public UserController(UserRepository userRepository, RoleRepository roleRepository, PasswordEncoder passwordEncoder, SettingsService settingsService, EntityToDtoMapper entityToDtoMapper) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
        this.settingsService = settingsService;
        this.entityToDtoMapper = entityToDtoMapper;
    }

    @GetMapping
    public ResponseEntity users() {
        return ResponseEntity.ok(userRepository.findAll()
                .stream().map(entityToDtoMapper::userToUserDto));
    }

    @GetMapping("/{id}")
    public ResponseEntity userWithPw(@PathVariable("id") long id) {
        return ResponseEntity.ok(userRepository.findById(id).map(entityToDtoMapper::userToUserWithPwdDto));
    }

    @PostMapping
    public ResponseEntity save(@RequestBody UserForm user) {
        var roles = roleRepository.findAllById(user.getRoles());
        var saved = userRepository.save(
                new User(0, user.getLogin(), user.getName(), user.getEmail(), passwordEncoder.encode(user.getPassword()), true, new HashSet<>(), roles.stream().collect(toSet()), new HashSet<>()));
        return ResponseEntity.ok(entityToDtoMapper.userToUserWithPwdDto(saved));
    }

    @PutMapping("/{id}")
    public ResponseEntity update(@PathVariable("id") long id, @RequestBody UserForm userForm) {
        var roles = roleRepository.findAllById(userForm.getRoles());
        var found = userRepository.findById(id).orElseThrow(() -> new RuntimeException("user not found"));
        found.setLogin(userForm.getLogin());
        found.setEmail(userForm.getEmail());
        found.setName(userForm.getName());
        found.setPassword(passwordEncoder.encode(userForm.getPassword()));
        found.setSettings(settingsService.getSettingsForUserAsMap(id).values().stream().collect(toSet()));
        var updated = userRepository.save(found);
        return ResponseEntity.ok(entityToDtoMapper.userToUserWithPwdDto(updated));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity delete(@PathVariable("id") long id) {
        var found = userRepository.findById(id).orElseThrow(() -> new RuntimeException("user not found"));
        found.getHosts().stream().forEach(host -> {
            host.setCreatedBy(null);
        });
        userRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
