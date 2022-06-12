package ru.serovmp.hostmanager.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import ru.serovmp.hostmanager.controller.ProtocolController;
import ru.serovmp.hostmanager.controller.form.NoteForm;
import ru.serovmp.hostmanager.controller.form.ProtocolForm;
import ru.serovmp.hostmanager.dto.ProtocolDto;
import ru.serovmp.hostmanager.entity.Protocol;
import ru.serovmp.hostmanager.repository.ProtocolRepository;

import java.util.HashSet;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProtocolServiceImpl implements ProtocolService {

    private ProtocolRepository protocolRepository;

    @Autowired
    public ProtocolServiceImpl(ProtocolRepository protocolRepository) {
        this.protocolRepository = protocolRepository;
    }

    public static ProtocolDto protocolToDto(Protocol protocol) {
        return new ProtocolDto(protocol.getId(), protocol.getName(), protocol.getExecutionLine(), protocol.getLaunchType().name(), protocol.getValidationRegex(), protocol.getExpectedExitCode());
    }

    @Override
    public List<ProtocolDto> protocols() {
        return protocolRepository.findAll()
                .stream()
                .map(ProtocolServiceImpl::protocolToDto)
                .collect(Collectors.toList());
    }

    @Override
    public ProtocolDto create(ProtocolForm protocol) {
        var launchType = Protocol.LaunchType.valueOf(protocol.getLaunchType());
        var saved = protocolRepository.save(new Protocol(0, protocol.getName(),
                protocol.getExecutionLine(), launchType, protocol.getValidationRegex(), protocol.getExpectedExitCode(), new HashSet<>()));
        return protocolToDto(saved);
    }

    @Override
    public ProtocolDto update(long id, ProtocolForm protocol) {
        var found = protocolRepository.findById(id).orElseThrow(() -> new RuntimeException(String.format("Protocol with id %d not found", id)));
        var launchType = Protocol.LaunchType.valueOf(protocol.getLaunchType());
        found.setName(protocol.getName());
        found.setExecutionLine(protocol.getExecutionLine());
        found.setLaunchType(launchType);
        found.setValidationRegex(protocol.getValidationRegex());
        found.setExpectedExitCode(protocol.getExpectedExitCode());
        return protocolToDto(protocolRepository.save(found));
    }

    @Override
    public void delete(long id) {
        var found = protocolRepository.findById(id).orElseThrow(() -> new RuntimeException(String.format("Protocol %d not found", id)));
        found.getHosts().stream().forEach(host -> {
            if (host.getProtocols().contains(found)) {
                host.getProtocols().remove(found);
            }
        });
        protocolRepository.deleteById(id);
    }
}
