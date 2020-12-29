package ru.serovmp.hostmanager.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ru.serovmp.hostmanager.dto.ProtocolDto;
import ru.serovmp.hostmanager.repository.ProtocolRepository;

import java.util.List;
import java.util.stream.Collectors;

@RequestMapping("/api/v1/protocols")
@RestController
public class ProtocolController {
    private ProtocolRepository protocolRepository;

    @Autowired
    public ProtocolController(ProtocolRepository protocolRepository) {
        this.protocolRepository = protocolRepository;
    }

    @GetMapping
    public List<ProtocolDto> protocols() {
        return protocolRepository.findAll()
                .stream()
                .map(protocol -> new ProtocolDto(protocol.getId(), protocol.getName(), protocol.getExecutionLine(), protocol.getLaunchType().toString()))
                .collect(Collectors.toList());
    }
}
