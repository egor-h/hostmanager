package ru.serovmp.hostmanager.service;

import ru.serovmp.hostmanager.dto.SettingsDto;
import ru.serovmp.hostmanager.entity.Setting;

import java.util.Map;

public interface SettingsService {

    SettingsDto defaultSettings();

    Map<String, Setting> getSettingsForUserAsMap(long id);

    SettingsDto getSettingsForUser(long id);

    SettingsDto saveSettingsForUser(long id, SettingsDto settings);
}
