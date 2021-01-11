package ru.serovmp.hostmanager.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class SettingsDto {
    public boolean expandTreeOnStartup;
    public long rootNode;
}
