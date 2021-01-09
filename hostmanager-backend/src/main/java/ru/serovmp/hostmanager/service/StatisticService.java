package ru.serovmp.hostmanager.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ru.serovmp.hostmanager.dto.HostDto;
import ru.serovmp.hostmanager.dto.StatisticsDto;
import ru.serovmp.hostmanager.entity.Host;
import ru.serovmp.hostmanager.repository.HostRepository;
import ru.serovmp.hostmanager.util.IPUtils;

import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class StatisticService {

    private HostRepository hostRepository;
    private HostService hostService;

    @Autowired
    public StatisticService(HostRepository hostRepository, HostService hostService) {
        this.hostRepository = hostRepository;
        this.hostService = hostService;
    }

    public StatisticsDto ipAddressStatistics() {
        Map<Long, List<Host>> hostsByNetwork = new HashMap<>();
        hostsByNetwork.put(0L, new LinkedList<>());
        List<Host> errors = new LinkedList<>();

        hostRepository.findAll().forEach(host -> {
            if (host.isDir() || (!host.isEnabled())) {
                return;
            }

            if (host.getAddress().trim().strip().equals("")) {
                hostsByNetwork.get(0L).add(host);
                return;
            }
            try {
                long netId = IPUtils.getNetId(IPUtils.ipAddressToByteRepr(host.getAddress()), IPUtils.ipAddressToByteRepr("255.255.255.0"));
                if (!hostsByNetwork.containsKey(netId)) {
                    hostsByNetwork.put(netId, new LinkedList<>());
                }
                hostsByNetwork.get(netId).add(host);
            } catch (RuntimeException e) {
                errors.add(host);
            }
        });

        return new StatisticsDto(hostsByNetwork.entrySet().stream().map(
                entry -> new StatisticsDto.SubnetStat(IPUtils.byteReprToIp(entry.getKey()), entry.getValue().size())).collect(Collectors.toList()),
                errors.stream().map(hostService::hostToDto).collect(Collectors.toList()));
    }
}
