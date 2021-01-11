package ru.serovmp.hostmanager.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ru.serovmp.hostmanager.dto.SettingsDto;
import ru.serovmp.hostmanager.entity.Setting;
import ru.serovmp.hostmanager.repository.SettingsRepository;

import java.util.Set;


@Service
public class SettingsService {
    public static final SettingsDto DEFAULT_SETTINGS = SettingsDto.builder()
            .expandTreeOnStartup(true)
            .rootNode(33)
            .build();

    private SettingsRepository settingsRepository;

    @Autowired
    public SettingsService(SettingsRepository settingsRepository) {
        this.settingsRepository = settingsRepository;
    }

    private SettingsDto mapSettingsToDto(Set<Setting> settings) {
        return new SettingsDto();
    }

    public SettingsDto getSettingsForUser(long id) {
        Set<Setting> settings = settingsRepository.findByUserId(id);
        if (settings.size() == 0) {
            return DEFAULT_SETTINGS;
        }
        return mapSettingsToDto(settings);
    }


    public SettingsDto saveSettingsForUser(long id, SettingsDto settings) {
        return new SettingsDto();
    }
}
