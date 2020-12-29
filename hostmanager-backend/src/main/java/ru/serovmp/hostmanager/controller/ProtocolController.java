package ru.serovmp.hostmanager.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.serovmp.hostmanager.controller.form.ProtocolForm;
import ru.serovmp.hostmanager.dto.ProtocolDto;
import ru.serovmp.hostmanager.entity.Protocol;
import ru.serovmp.hostmanager.repository.ProtocolRepository;

import java.util.LinkedList;
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

    public static ProtocolDto protocolToDto(Protocol protocol) {
        return new ProtocolDto(protocol.getId(), protocol.getName(), protocol.getExecutionLine(), protocol.getLaunchType().name());
    }

    @GetMapping
    public List<ProtocolDto> protocols() {
        return protocolRepository.findAll()
                .stream()
                .map(ProtocolController::protocolToDto)
                .collect(Collectors.toList());
    }

    @PostMapping
    public ResponseEntity save(@RequestBody ProtocolForm protocol) {
        var launchType = Protocol.LaunchType.valueOf(protocol.getLaunchType());
        var saved = protocolRepository.save(new Protocol(0, protocol.getName(),
                protocol.getExecutionLine(), launchType, new LinkedList<>()));
        return ResponseEntity.ok(protocolToDto(saved));
    }

    @PutMapping("/{id}")
    public ResponseEntity update(@PathVariable("id") long id, @RequestBody ProtocolForm protocol) {
        var launchType = Protocol.LaunchType.valueOf(protocol.getLaunchType());
        var saved = protocolRepository.save(new Protocol(0, protocol.getName(),
                protocol.getExecutionLine(), launchType, new LinkedList<>()));
        return ResponseEntity.ok(protocolToDto(saved));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity delete(@PathVariable("id") long id) {
        protocolRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    @ExceptionHandler({IllegalArgumentException.class})
    public ResponseEntity handleLaunchTypeNotFound(Exception e) {
        return ResponseEntity.badRequest().build();
    }


}
