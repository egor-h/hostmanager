package ru.serovmp.hostmanager.config;

import com.github.egorh.sonic.SonicPool;
import lombok.extern.slf4j.Slf4j;
import org.mapstruct.factory.Mappers;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import ru.serovmp.hostmanager.config.search.SonicConnectionProperties;
import ru.serovmp.hostmanager.service.HostService;
import ru.serovmp.hostmanager.service.search.Searcher;
import ru.serovmp.hostmanager.service.search.SonicSearcher;
import ru.serovmp.hostmanager.service.zabbix.ZabbixService;
import ru.serovmp.hostmanager.service.zabbix.ZabbixServiceImpl;
import ru.serovmp.hostmanager.service.zabbix.ZabbixServiceNoOp;
import ru.serovmp.hostmanager.util.EntityToDtoMapper;

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

    @Bean
    public EntityToDtoMapper entityToDtoMapper() {
        return Mappers.getMapper(EntityToDtoMapper.class);
    }

    @Bean
    @ConditionalOnProperty(prefix = "hostsmanager.search", name = "mode", havingValue = "sonic")
    public Searcher sonicSearcher(SonicConnectionProperties sonicCfg) {
        log.info("Try to connect to sonic with settings {}", sonicCfg);
        return new SonicSearcher(new SonicPool(sonicCfg.getAddress(), sonicCfg.getPort(), sonicCfg.getPassword(), sonicCfg.getTimeout()));
    }
}
