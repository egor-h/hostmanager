package ru.serovmp.hostmanager.service;

import org.hibernate.annotations.common.reflection.ReflectionUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.ReflectionUtils;
import ru.serovmp.hostmanager.dto.SettingsDto;
import ru.serovmp.hostmanager.entity.Setting;
import ru.serovmp.hostmanager.repository.SettingsRepository;
import ru.serovmp.hostmanager.repository.UserRepository;

import java.lang.reflect.Field;
import java.util.HashMap;
import java.util.Set;


@Service
public class SettingsService {
    public static final SettingsDto DEFAULT_SETTINGS = SettingsDto.builder()
            .expandTreeOnStartup(true)
            .rootNode(2)
            .build();

    private SettingsRepository settingsRepository;
    private UserRepository userRepository;

    @Autowired
    public SettingsService(SettingsRepository settingsRepository, UserRepository userRepository) {
        this.settingsRepository = settingsRepository;
        this.userRepository = userRepository;
    }

    private SettingsDto mapSettingsToDto(Set<Setting> settings) {
        return new SettingsDto();
    }

    public SettingsDto defaultSettings() {
        return DEFAULT_SETTINGS;
    }

    public SettingsDto getSettingsForUser(long id) {
        Set<Setting> settingsSet = settingsRepository.findByUserId(id);
        if (settingsSet.size() == 0) {
            return DEFAULT_SETTINGS;
        }

        SettingsDto mappedSettings = new SettingsDto();

        var settingsMap = new HashMap<String, Setting>();
        settingsSet.stream().forEach(setting -> {
            settingsMap.put(setting.getKeyName(), setting);
        });


        for (Field field: mappedSettings.getClass().getFields()) {
            var stringKey = field.getName();

            if (settingsMap.containsKey(stringKey)) {
                Setting curSetting = settingsMap.get(stringKey);
                var curSettingType = settingTypeToJavaType(curSetting.getType());
                var curSettingValue = stringRepresentationToValue(curSetting.getValue(), settingTypeToJavaType(curSetting.getType()));
                ReflectionUtils.setField(field, mappedSettings, curSettingValue);

            } else {
                var value = ReflectionUtils.getField(field, DEFAULT_SETTINGS);
                ReflectionUtils.setField(field, mappedSettings, value);
            }

        }

        return mappedSettings;
    }


    public SettingsDto saveSettingsForUser(long id, SettingsDto settings) {
        var user = userRepository.findById(id).orElseThrow(() -> new RuntimeException("user not found"));
        var settingsSet = settingsRepository.findByUserId(user.getId());

        var settingsMap = new HashMap<String, Setting>();
        settingsSet.stream().forEach(setting -> {
            settingsMap.put(setting.getKeyName(), setting);
        });

        for (Field field: settings.getClass().getFields()) {
            var stringKey = field.getName();
            var stringValue = ReflectionUtils.getField(field, settings).toString();

            if (! settingsMap.containsKey(stringKey)) {
                settingsRepository.save(new Setting(0, user, stringKey, stringValue, javaTypeToSettingType(field)));
            } else {
                var currentSetting = settingsMap.get(stringKey);
                currentSetting.setValue(stringValue);
                currentSetting.setType(javaTypeToSettingType(field));
                settingsRepository.save(currentSetting);
            }
        }
        return settings;
    }


    static <T> T stringRepresentationToValue(String str, Class<T> type) {
        if (type.equals(String.class)) {
            return type.cast(str);
        } else if (type.equals(Long.class) || type.equals(long.class)) {
            return type.cast(Long.valueOf(str));
        } else if (type.equals(Integer.class) || type.equals(int.class)) {
            return type.cast(Integer.valueOf(str));
        } else if (type.equals(Boolean.class) || type.equals(boolean.class)) {
            return type.cast(Boolean.valueOf(str));
        }
        throw new RuntimeException(String.format("Unsupported type: %s", type));
    }

    static Setting.Type javaTypeToSettingType(Field field) {
        if (field.getType().equals(int.class) || field.getType().equals(long.class)) {
            return Setting.Type.LONG;
        } else if (field.getType().equals(String.class)) {
            return Setting.Type.STRING;
        } else if (field.getType().equals(boolean.class)) {
            return Setting.Type.BOOLEAN;
        }

        throw new RuntimeException(String.format("Unsupported type: %s", field.getType()));
    }

    static Class<?> settingTypeToJavaType(Setting.Type type) {
        if (type.equals(Setting.Type.BOOLEAN)) {
            return Boolean.class;
        } else if (type.equals(Setting.Type.STRING)) {
            return String.class;
        } else if (type.equals(Setting.Type.LONG)) {
            return Long.class;
        }

        throw new RuntimeException(String.format("Unsupported type: %s", type));
    }
}
