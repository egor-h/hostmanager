package ru.serovmp.hostmanager.config;

import lombok.extern.log4j.Log4j;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import ru.serovmp.hostmanager.service.HostService;
import ru.serovmp.hostmanager.service.zabbix.ZabbixService;
import ru.serovmp.hostmanager.service.zabbix.ZabbixServiceImpl;
import ru.serovmp.hostmanager.service.zabbix.ZabbixServiceNoOp;

@Slf4j
@Configuration
public class ApplicationConfig {

    @Bean(initMethod = "init")
    public ZabbixService zabbixService(ZabbixConfigurationProperties zabbixConfig, HostService hostService) {
        if (zabbixConfig.getLogin() == null || zabbixConfig.getUrl() == null || zabbixConfig.getPassword() == null) {
            return new ZabbixServiceNoOp();
        }

        return new ZabbixServiceImpl(zabbixConfig, hostService);
    }
}
