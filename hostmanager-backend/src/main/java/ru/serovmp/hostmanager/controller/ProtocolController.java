package ru.serovmp.hostmanager.controller;

import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.serovmp.hostmanager.controller.form.ProtocolForm;
import ru.serovmp.hostmanager.dto.ProtocolDto;
import ru.serovmp.hostmanager.entity.Protocol;
import ru.serovmp.hostmanager.repository.ProtocolRepository;
import ru.serovmp.hostmanager.service.ProtocolService;

import java.util.HashSet;
import java.util.List;
import java.util.stream.Collectors;

@SecurityRequirement(name = "bearer-key")
@RequestMapping("/api/v1/protocols")
@RestController
public class ProtocolController {
    private ProtocolService protocolService;

    @Autowired
    public ProtocolController(ProtocolService protocolService) {
        this.protocolService = protocolService;
    }

    @GetMapping
    public List<ProtocolDto> protocols() {
        return protocolService.protocols();
    }

    @PostMapping
    public ResponseEntity save(@RequestBody ProtocolForm protocol) {
        return ResponseEntity.ok(protocolService.create(protocol));
    }

    @PutMapping("/{id}")
    public ResponseEntity update(@PathVariable("id") long id, @RequestBody ProtocolForm protocol) {
        return ResponseEntity.ok(protocolService.update(id, protocol));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity delete(@PathVariable("id") long id) {
        protocolService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @ExceptionHandler({IllegalArgumentException.class})
    public ResponseEntity handleLaunchTypeNotFound(Exception e) {
        return ResponseEntity.badRequest().build();
    }


}
