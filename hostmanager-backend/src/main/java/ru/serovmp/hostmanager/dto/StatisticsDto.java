package ru.serovmp.hostmanager.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import ru.serovmp.hostmanager.entity.Host;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class StatisticsDto {
    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class SubnetStat {
        private String network;
        private long hosts;
    }

    private List<SubnetStat> bySubnet;
    private List<HostDto> errors;
}
