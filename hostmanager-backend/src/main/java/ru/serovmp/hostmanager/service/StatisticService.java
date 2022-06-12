package ru.serovmp.hostmanager.service;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import ru.serovmp.hostmanager.controller.form.SubnetForm;
import ru.serovmp.hostmanager.dto.StatisticsDto;
import ru.serovmp.hostmanager.entity.Host;
import ru.serovmp.hostmanager.entity.Subnet;
import ru.serovmp.hostmanager.util.IPUtils;

import java.util.List;
import java.util.Map;

public interface StatisticService {
    StatisticsDto ipAddressStatistics();

    List<Subnet> subnets();

    Subnet createSubnet(SubnetForm subnet);

    Subnet updateSubnet(long id, SubnetForm subnet);

    void deleteSubnet(long id);

    long whatNetwork(long address, Map<Long, Long> networkToMask);

    Map<String, List<Host>> hostsBySubnet();

    Map<String, List<StatisticService.AddressInterval>> subnetsIntervals();

    List<StatisticService.AddressInterval> intervalForSubnet(List<Host> hosts);

    List<StatisticService.AddressInterval> hostsBySubnetsWithEmptyIntervals(List<Host> hosts);

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    class AddressInterval {
        private boolean empty;
        private String intervalStart;
        private String intervalEnd;

        @JsonIgnore
        public long getIntervalStartBytes() {
            return IPUtils.ipAddressToByteRepr(intervalStart);
        }

        @JsonIgnore
        public long getIntervalEndBytes() {
            return IPUtils.ipAddressToByteRepr(intervalEnd);
        }

        public boolean in(String address) {
            var addressBytes = IPUtils.ipAddressToByteRepr(address);
            var startBytes = IPUtils.ipAddressToByteRepr(intervalStart);
            var endBytes = IPUtils.ipAddressToByteRepr(intervalEnd);
            return addressBytes >= startBytes && addressBytes <= endBytes;
        }
    }
}
