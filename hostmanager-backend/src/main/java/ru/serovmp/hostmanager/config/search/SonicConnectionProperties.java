package ru.serovmp.hostmanager.config.search;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Configuration
@Data
@NoArgsConstructor
@ConfigurationProperties("hostsmanager.search.sonic")
public class SonicConnectionProperties {
    private String address;
    private int port;
    private int timeout;
    private String password;
}
