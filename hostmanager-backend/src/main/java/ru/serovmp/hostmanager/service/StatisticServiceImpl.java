package ru.serovmp.hostmanager.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ru.serovmp.hostmanager.controller.form.SubnetForm;
import ru.serovmp.hostmanager.dto.StatisticsDto;
import ru.serovmp.hostmanager.entity.Host;
import ru.serovmp.hostmanager.entity.Subnet;
import ru.serovmp.hostmanager.repository.HostRepository;
import ru.serovmp.hostmanager.repository.SubnetsRepository;
import ru.serovmp.hostmanager.util.IPUtils;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class StatisticServiceImpl implements StatisticService {

    private HostRepository hostRepository;
    private HostService hostService;
    private SubnetsRepository subnetsRepository;

    @Autowired
    public StatisticServiceImpl(HostRepository hostRepository, HostService hostService, SubnetsRepository subnetsRepository) {
        this.hostRepository = hostRepository;
        this.hostService = hostService;
        this.subnetsRepository = subnetsRepository;
    }


    @Override
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


    @Override
    public List<Subnet> subnets() {
        return subnetsRepository.findAll();
    }

    @Override
    public Subnet createSubnet(SubnetForm subnet) {
        var newSubnet = new Subnet(0, subnet.getName(), subnet.getAddress(), subnet.getMask());
        return subnetsRepository.save(newSubnet);
    }

    @Override
    public Subnet updateSubnet(long id, SubnetForm subnet) {
        var foundSubnet = subnetsRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Subnet with id " + id + " not found"));
        subnet.setName(subnet.getName());
        subnet.setAddress(subnet.getAddress());
        subnet.setMask(subnet.getMask());

        return subnetsRepository.save(foundSubnet);
    }

    @Override
    public void deleteSubnet(long id) {
        subnetsRepository.deleteById(id);
    }

    @Override
    public long whatNetwork(long address, Map<Long, Long> networkToMask) {
        for (Map.Entry<Long, Long> networkEntry: networkToMask.entrySet()) {
            long network = networkEntry.getKey();
            long mask = networkEntry.getValue();
            if (IPUtils.isSubnetOf(address, mask, network)) {
                return network;
            }
        }
        return 0;
    }

    @Override
    public Map<String, List<Host>> hostsBySubnet() {
        Map<String, List<Host>> hostsBySubnet = new HashMap<>();
        Map<Long, Long> networkToMask = new HashMap<>();
        subnetsRepository.findAll().stream().forEach(subnet -> {
            hostsBySubnet.put(subnet.getAddress(), new ArrayList<>(255));
            networkToMask.put(IPUtils.ipAddressToByteRepr(subnet.getAddress()), IPUtils.ipAddressToByteRepr(subnet.getMask()));
        });
//        hostsBySubnet.put("192.168.0.0", new ArrayList<Host>(256));
//        hostsBySubnet.put("192.168.1.0", new ArrayList<Host>(256));
//        hostsBySubnet.put("192.168.2.0", new ArrayList<Host>(256));
//        hostsBySubnet.put("192.168.3.0", new ArrayList<Host>(256));
//        hostsBySubnet.put("192.168.4.0", new ArrayList<Host>(256));
//        hostsBySubnet.put("192.168.8.0", new ArrayList<Host>(256));

        hostRepository.findAll().stream()
                .filter(host -> IPUtils.isValid(host.getAddress()))
                .forEach(host -> {
            try {
                var hostBytesIp = IPUtils.ipAddressToByteRepr(host.getAddress());
                var netId = whatNetwork(hostBytesIp, networkToMask);
                if (hostsBySubnet.containsKey(IPUtils.byteReprToIp(netId))) {
                    hostsBySubnet.get(IPUtils.byteReprToIp(netId)).add(host);
                }
            } catch (RuntimeException e) {

            }
        });

        return hostsBySubnet;
    }

    @Override
    public Map<String, List<AddressInterval>> subnetsIntervals() {
        var subnets = hostsBySubnet();
        return subnets.entrySet().stream().collect(Collectors.toMap(
                entry -> entry.getKey(),
                entry -> hostsBySubnetsWithEmptyIntervals(entry.getValue())
        ));
    }

    @Override
    public List<AddressInterval> intervalForSubnet(List<Host> hosts) {
        String mask = "255.255.255.0";
        long maskBytes = IPUtils.ipAddressToByteRepr(mask);

        var sortedHosts = hosts.stream().sorted((h1, h2) -> {
            var hostId1 = IPUtils.getHostId(IPUtils.ipAddressToByteRepr(h1.getAddress()), maskBytes);
            var hostId2 = IPUtils.getHostId(IPUtils.ipAddressToByteRepr(h2.getAddress()), maskBytes);
            return (int) (hostId1 - hostId2);
        }).collect(Collectors.toList());

        List<AddressInterval> addressIntervals = new LinkedList<>();
        AddressInterval currentInterval = new AddressInterval(false, sortedHosts.get(0).getAddress(), sortedHosts.get(0).getAddress());;

        for (int i = 0; i < sortedHosts.size(); i++) {
            var host = sortedHosts.get(i);
            var curHostId = IPUtils.getHostId(IPUtils.ipAddressToByteRepr(host.getAddress()), maskBytes);
            var curIntervalEnd = IPUtils.getHostId(IPUtils.ipAddressToByteRepr(currentInterval.getIntervalEnd()), maskBytes);

            if (curIntervalEnd+1 == curHostId) {
                var newEndInterval = IPUtils.byteReprToIp(IPUtils.ipAddressToByteRepr(currentInterval.getIntervalEnd())+1);
                currentInterval.setIntervalEnd(newEndInterval);
            }

            if (Math.abs(curIntervalEnd - curHostId) > 1) {
                addressIntervals.add(currentInterval);
                currentInterval = new AddressInterval(false, host.getAddress(), host.getAddress());
            }
        }

        addressIntervals.add(currentInterval);

        return addressIntervals;
    }

    @Override
    public List<AddressInterval> hostsBySubnetsWithEmptyIntervals(List<Host> hosts) {
        var intervals = intervalForSubnet(hosts);
        String mask = "255.255.255.0";
        long maskBytes = IPUtils.ipAddressToByteRepr(mask);
        long subnetBytes = IPUtils.getNetId(IPUtils.ipAddressToByteRepr(intervals.get(0).getIntervalStart()), maskBytes);
        String subnet = IPUtils.byteReprToIp(subnetBytes);

        List<AddressInterval> intervalsWithSpaces = new LinkedList<>();

        if (IPUtils.getHostId(IPUtils.ipAddressToByteRepr(intervals.get(0).getIntervalStart()), maskBytes) != 0) {
            var end = IPUtils.byteReprToIp(IPUtils.ipAddressToByteRepr(intervals.get(0).getIntervalStart())-1);
            intervalsWithSpaces.add(new AddressInterval(true, subnet, end));
        }

        for (int i = 0, nextI = i + 1; nextI < intervals.size(); i++, nextI++) {

            var curInterval = intervals.get(i);
            var nextInterval = intervals.get(nextI);
            var spaceStart = IPUtils.byteReprToIp(IPUtils.ipAddressToByteRepr(curInterval.getIntervalEnd())+1);
            var spaceEnd = IPUtils.byteReprToIp(IPUtils.ipAddressToByteRepr(nextInterval.getIntervalStart())-1);
//            intervalsWithSpaces.add(curInterval);
            intervalsWithSpaces.add(new AddressInterval(true, spaceStart, spaceEnd));
            intervalsWithSpaces.add(nextInterval);
        }
        return intervalsWithSpaces;
    }
}
