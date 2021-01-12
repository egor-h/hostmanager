package ru.serovmp.hostmanager.controller;

import lombok.Getter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import ru.serovmp.hostmanager.dto.SettingsDto;
import ru.serovmp.hostmanager.entity.User;
import ru.serovmp.hostmanager.service.SettingsService;

@RequestMapping("/api/v1/settings")
@RestController
public class SettingsController {
    private SettingsService settingsService;

    @Autowired
    public SettingsController(SettingsService settingsService) {
        this.settingsService = settingsService;
    }

    @GetMapping
    public ResponseEntity allSettings(@AuthenticationPrincipal User principal) {
        return ResponseEntity.ok(settingsService.getSettingsForUser(principal.getId()));
    }

    @GetMapping("/default")
    public ResponseEntity getDefaultSettings() {
        return ResponseEntity.ok(settingsService.defaultSettings());
    }

    @PutMapping
    public ResponseEntity saveSettings(@RequestBody SettingsDto settings, @AuthenticationPrincipal User principal) {
        return ResponseEntity.ok(settingsService.saveSettingsForUser(principal.getId(), settings));
    }
}
