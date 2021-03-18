package ru.serovmp.hostmanager.config;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@ConfigurationProperties("zabbix")
@Component
@AllArgsConstructor
@NoArgsConstructor
@Data
public class ZabbixConfigurationProperties {
    private String url;
    private String login;
    private String password;
}
