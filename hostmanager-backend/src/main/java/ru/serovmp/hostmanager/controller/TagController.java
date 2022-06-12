package ru.serovmp.hostmanager.controller;

import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.serovmp.hostmanager.controller.form.TagForm;
import ru.serovmp.hostmanager.dto.TagDto;
import ru.serovmp.hostmanager.entity.Tag;
import ru.serovmp.hostmanager.repository.TagRepository;
import ru.serovmp.hostmanager.service.TagService;
import ru.serovmp.hostmanager.util.EntityToDtoMapper;

import java.util.HashSet;

@SecurityRequirement(name = "bearer-key")
@RequestMapping("/api/v1/tags")
@RestController
public class TagController {
    private TagService tagService;

    @Autowired
    public TagController(TagService tagService) {
        this.tagService = tagService;
    }

    @GetMapping
    public ResponseEntity tags() {
        return ResponseEntity.ok(tagService.tags());
    }

    @GetMapping("/{id}/hosts")
    public ResponseEntity hostsWithTag(@PathVariable("id") long id) {
        return ResponseEntity.ok(tagService.hostsWithTag(id));
    }

    @PostMapping
    public ResponseEntity save(@RequestBody TagForm tag) {
        return ResponseEntity.ok(tagService.create(tag));
    }

    @PutMapping("/{id}")
    public ResponseEntity update(@PathVariable("id") long id, @RequestBody TagForm tag) {
        return ResponseEntity.ok(tagService.update(id, tag));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity delete(@PathVariable("id") long id) {
        tagService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
