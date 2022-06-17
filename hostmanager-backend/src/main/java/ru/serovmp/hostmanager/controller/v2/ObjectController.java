package ru.serovmp.hostmanager.controller.v2;

import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.method.annotation.MvcUriComponentsBuilder;
import ru.serovmp.hostmanager.controller.form.HostForm;
import ru.serovmp.hostmanager.dto.ObjectDto;
import ru.serovmp.hostmanager.service.ObjectService;

import java.util.List;

@RestController
@RequestMapping("/api/v2/object")
@Validated
@SecurityRequirement(name = "bearer-key")
public class ObjectController {

    private ObjectService objectService;

    @Autowired
    public ObjectController(ObjectService objectService) {
        this.objectService = objectService;
    }

    @GetMapping("/{parentId}")
    public ResponseEntity<List<ObjectDto>> get(@PathVariable("parentId") long parentId) {
        return ResponseEntity.ok(objectService.get(parentId));
    }

    @PostMapping("/{parentId}")
    public ResponseEntity create(@PathVariable("parentId") long parentId, @RequestBody HostForm hostForm) {
        var created = objectService.create(parentId, hostForm);
        var createdUri = MvcUriComponentsBuilder.fromMethodName(ObjectController.class, "get", created.getId()).build(created.getId());
        return ResponseEntity.created(createdUri).build();
    }

    @PutMapping("/{id}")
    public ResponseEntity update(@PathVariable("id") long id, @RequestBody HostForm hostForm) {
        var updated = objectService.update(id, hostForm);
        var createdUri = MvcUriComponentsBuilder.fromMethodName(ObjectController.class, "get", updated.getId()).build(updated.getId());
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity delete(@PathVariable("id") long id) {
        return ResponseEntity.noContent().build();
    }
}
