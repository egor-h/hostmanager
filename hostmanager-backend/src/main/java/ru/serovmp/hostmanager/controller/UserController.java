package ru.serovmp.hostmanager.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import ru.serovmp.hostmanager.controller.form.UserForm;
import ru.serovmp.hostmanager.dto.TagDto;
import ru.serovmp.hostmanager.dto.UserDto;
import ru.serovmp.hostmanager.dto.UserWithPasswordDto;
import ru.serovmp.hostmanager.entity.User;
import ru.serovmp.hostmanager.repository.RoleRepository;
import ru.serovmp.hostmanager.repository.UserRepository;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import static java.util.stream.Collectors.toSet;

@RequestMapping("/api/v1/users")
@RestController
public class UserController {

    private UserRepository userRepository;
    private RoleRepository roleRepository;
    private PasswordEncoder passwordEncoder;

    @Autowired
    public UserController(UserRepository userRepository, RoleRepository roleRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @GetMapping
    public ResponseEntity users() {
        return ResponseEntity.ok(userRepository.findAll()
                .stream()
                .map(user -> new UserDto(user.getId(), user.getLogin(), user.getName(), user.getEmail(), user.getRoles()
                        .stream()
                        .map(r -> r.getId())
                        .collect(toSet()))
                ));
    }

    @GetMapping("/{id}")
    public ResponseEntity userWithPw(@PathVariable("id") long id) {
        return ResponseEntity.ok(userRepository.findById(id)
                .map(user -> new UserWithPasswordDto(
                        user.getId(), user.getLogin(), user.getName(),
                        user.getEmail(), user.getPassword(), user.getRoles().stream().map(r -> r.getId()).collect(toSet()))));
    }

    @PostMapping
    public ResponseEntity save(@RequestBody UserForm user) {
        var roles = roleRepository.findAllById(user.getRoles());
        var saved = userRepository.save(
                new User(0, user.getLogin(), user.getName(), user.getEmail(), passwordEncoder.encode(user.getPassword()), true, new HashSet<>(), roles.stream().collect(toSet()), new HashSet<>()));
        return ResponseEntity.ok(new TagDto(saved.getId(), saved.getName()));
    }

    @PutMapping("/{id}")
    public ResponseEntity update(@PathVariable("id") long id, @RequestBody UserForm userForm) {
        var roles = roleRepository.findAllById(userForm.getRoles());
        var found = userRepository.findById(id).orElseThrow(() -> new RuntimeException("user not found"));
        found.setLogin(userForm.getLogin());
        found.setEmail(userForm.getEmail());
        found.setName(userForm.getName());
        found.setSettings(new HashSet<>());
        found.setRoles(roles.stream().collect(toSet()));
        var updated = userRepository.save(found);
        return ResponseEntity.ok(updated);
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
