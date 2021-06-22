package ru.serovmp.hostmanager.service;

import org.junit.jupiter.api.Test;
import ru.serovmp.hostmanager.entity.Host;
import ru.serovmp.hostmanager.repository.HostRepository;
import ru.serovmp.hostmanager.repository.SubnetsRepository;
import ru.serovmp.hostmanager.util.IPUtils;

import java.util.List;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.mock;

class StatisticServiceTest {

    List<Host> TEST_DATA = List.of(
            Host.builder().name("1").address("192.168.0.2").build(),
            Host.builder().name("2").address("192.168.0.3").build(),
            Host.builder().name("3").address("192.168.0.4").build(),
            Host.builder().name("4").address("192.168.0.10").build(),
            Host.builder().name("5").address("192.168.0.20").build(),
            Host.builder().name("6").address("192.168.0.21").build(),
            Host.builder().name("7").address("192.168.0.22").build(),
            Host.builder().name("8").address("192.168.0.23").build(),
            Host.builder().name("9").address("192.168.0.30").build(),
            Host.builder().name("10").address("192.168.0.31").build(),
            Host.builder().name("11").address("192.168.0.32").build(),
            Host.builder().name("11").address("192.168.0.35").build()
    );

    @Test
    void intervalForSubnet_5addressGroupsSupplied_5groupsFound() {
        StatisticService statisticService = new StatisticService(mock(HostRepository.class), mock(HostService.class), mock(SubnetsRepository.class));
        var intervals = statisticService.intervalForSubnet(TEST_DATA);

        assertEquals(5, intervals.size());
        assertEquals("192.168.0.2", intervals.get(0).getIntervalStart());
        assertEquals("192.168.0.4", intervals.get(0).getIntervalEnd());
    }

    @Test
    void hostsBySubnetsWithEmptyIntervals_123() {
        StatisticService statisticService = new StatisticService(mock(HostRepository.class), mock(HostService.class), mock(SubnetsRepository.class));
        var intervals = statisticService.hostsBySubnetsWithEmptyIntervals(TEST_DATA);

    }

    @Test
    void whatNetwork_given3networks_oneNetworkMatches() {
        Map<Long, Long> networkToMask = Map.of(
                IPUtils.ipAddressToByteRepr("192.168.0.0"), IPUtils.ipAddressToByteRepr("255.255.255.0"),
                IPUtils.ipAddressToByteRepr("192.168.1.0"), IPUtils.ipAddressToByteRepr("255.255.255.0"),
                IPUtils.ipAddressToByteRepr("192.168.2.0"), IPUtils.ipAddressToByteRepr("255.255.255.0")
        );
        long address = IPUtils.ipAddressToByteRepr("192.168.1.20");

        StatisticService statisticService = new StatisticService(mock(HostRepository.class), mock(HostService.class), mock(SubnetsRepository.class));
        long netowrk = statisticService.whatNetwork(address, networkToMask);

        assertEquals(IPUtils.ipAddressToByteRepr("192.168.1.0"), netowrk);
    }

    @Test
    void whatNetwork_given3networks_noNetworksMatched() {
        Map<Long, Long> networkToMask = Map.of(
                IPUtils.ipAddressToByteRepr("192.168.0.0"), IPUtils.ipAddressToByteRepr("255.255.255.0"),
                IPUtils.ipAddressToByteRepr("192.168.1.0"), IPUtils.ipAddressToByteRepr("255.255.255.0"),
                IPUtils.ipAddressToByteRepr("192.168.2.0"), IPUtils.ipAddressToByteRepr("255.255.255.0")
        );
        long address = IPUtils.ipAddressToByteRepr("192.168.10.122");

        StatisticService statisticService = new StatisticService(mock(HostRepository.class), mock(HostService.class), mock(SubnetsRepository.class));
        long netowrk = statisticService.whatNetwork(address, networkToMask);

        assertEquals(0, netowrk);

    }

}