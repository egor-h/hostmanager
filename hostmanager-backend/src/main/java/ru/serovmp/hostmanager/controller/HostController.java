package ru.serovmp.hostmanager.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.enums.SecuritySchemeType;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.security.SecurityScheme;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import ru.serovmp.hostmanager.controller.form.HostForm;
import ru.serovmp.hostmanager.dto.HostDto;
import ru.serovmp.hostmanager.exception.HostIsNotDirException;
import ru.serovmp.hostmanager.exception.HostNotFoundException;
import ru.serovmp.hostmanager.service.HostService;

import javax.servlet.http.HttpServletRequest;
import java.util.Map;
import java.util.Optional;

@SecurityRequirement(name = "bearer-key")
@RestController
@RequestMapping("/api/v1/hosts")
public class HostController {
    private static final long TREE_ROOT_ID = 1;

    private HostService hostService;

    @Autowired
    public HostController(HostService hostService) {
        this.hostService = hostService;
    }

    @GetMapping("/{parentId}")
    public ResponseEntity<HostDto> getTree(@PathVariable(required = false) Optional<Long> parentId) {
        return ResponseEntity.ok(parentId.map(hostService::getTree).orElseGet(hostService::getTreeFromRoot));
    }

    @PostMapping("/{parentId}")
    public ResponseEntity<HostDto> save(@PathVariable long parentId, @RequestBody HostForm newHost,
                                        HttpServletRequest request) {
        var saved = hostService.save(parentId, newHost);
        var uri = ServletUriComponentsBuilder.fromContextPath(request)
                .path("/api/v1/hosts/{id}")
                .build(saved.getId());
        return ResponseEntity.created(uri).body(saved);
    }

    @PutMapping("/{id}")
    public ResponseEntity<HostDto> update(@PathVariable long id, @RequestBody HostForm changedHost) {
        return ResponseEntity.ok(hostService.update(id, changedHost));
    }

    @PutMapping("/{hostId}/to/{dirId}")
    public HostDto moveHost() {
        return null;
    }

    @DeleteMapping("/{id}")
    public ResponseEntity deleteHost(@PathVariable long id) {
        hostService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @ExceptionHandler(HostNotFoundException.class)
    public ResponseEntity hostNotFound() {
        return ResponseEntity.notFound().build();
    }

    @ExceptionHandler(HostIsNotDirException.class)
    public ResponseEntity hostIsNotDir(Exception e) {
        return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity any(Exception e) {
        return ResponseEntity
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(Map.of("error", e.getMessage()));
    }
}
