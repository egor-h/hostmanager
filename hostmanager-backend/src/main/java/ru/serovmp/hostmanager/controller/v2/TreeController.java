package ru.serovmp.hostmanager.controller.v2;

import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.method.annotation.MvcUriComponentsBuilder;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import org.springframework.web.util.UriComponentsBuilder;
import ru.serovmp.hostmanager.controller.form.TreeForm;
import ru.serovmp.hostmanager.dto.TreeItemDto;
import ru.serovmp.hostmanager.service.TreeService;

@RequestMapping("/api/v2/tree")
@RestController
@Validated
@SecurityRequirement(name = "bearer-key")
public class TreeController {
    public static final long TREE_ROOT_ID = 2;

    private TreeService treeService;

    @Autowired
    public TreeController(TreeService treeService) {
        this.treeService = treeService;
    }

    @GetMapping
    public ResponseEntity<TreeItemDto> all() {
        return ResponseEntity.ok(treeService.tree(TREE_ROOT_ID));
    }

    @GetMapping("/{id}")
    public ResponseEntity<TreeItemDto> byId(@PathVariable("id") long id) {
        return ResponseEntity.ok().build();
    }

    @PostMapping("/{parentId}")
    public ResponseEntity create(@RequestBody TreeForm treeForm, @PathVariable("parentId") long parentId) {
        var created = treeService.create(treeForm, parentId);
        var createdPath = MvcUriComponentsBuilder.fromMethodName(TreeController.class, "byId", created.getId()).build(created.getId());
        return ResponseEntity.created(createdPath).build();
    }

    @PutMapping("/{id}")
    public ResponseEntity update(@PathVariable("id") long id, @RequestBody TreeForm treeForm) {
        var updated = treeService.update(id, treeForm);
        var createdPath = MvcUriComponentsBuilder.fromMethodName(TreeController.class, "byId", updated.getId()).build(updated.getId());
        return ResponseEntity.created(createdPath).build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity delete(@PathVariable("id") long id) {
        treeService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
