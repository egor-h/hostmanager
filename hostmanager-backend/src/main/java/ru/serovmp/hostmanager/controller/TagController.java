package ru.serovmp.hostmanager.controller;

import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.serovmp.hostmanager.controller.form.TagForm;
import ru.serovmp.hostmanager.dto.TagDto;
import ru.serovmp.hostmanager.entity.Tag;
import ru.serovmp.hostmanager.repository.TagRepository;

import java.util.HashSet;

@SecurityRequirement(name = "bearer-key")
@RequestMapping("/api/v1/tags")
@RestController
public class TagController {

    private TagRepository tagRepository;

    @Autowired
    public TagController(TagRepository tagRepository) {
        this.tagRepository = tagRepository;
    }

    @GetMapping
    public ResponseEntity tags() {
        return ResponseEntity.ok(tagRepository.findAll().stream().map(tag -> new TagDto(tag.getId(), tag.getName())));
    }

    @GetMapping("/{id}/hosts")
    public ResponseEntity hostsWithTag(@PathVariable("id") long id) {
        return ResponseEntity.ok(tagRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("tag " + id + "not found"))
                .getHosts());
    }

    @PostMapping
    public ResponseEntity save(@RequestBody TagForm tag) {
        var saved = tagRepository.save(new Tag(0, tag.getName(), new HashSet<>()));
        return ResponseEntity.ok(new TagDto(saved.getId(), saved.getName()));
    }

    @PutMapping("/{id}")
    public ResponseEntity update(@PathVariable("id") long id, @RequestBody TagForm tag) {
        var found = tagRepository.findById(id).orElseThrow(() -> new RuntimeException("tag not found"));
        var updated = tagRepository.save(new Tag(id, tag.getName(), found.getHosts()));
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity delete(@PathVariable("id") long id) {
        var found = tagRepository.findById(id).orElseThrow(() -> new RuntimeException("tag not found"));
        // remove just associations
        found.getHosts().stream().forEach((host) -> {
            if (host.getTags().contains(found)) {
                host.getTags().remove(found);
            }
        });
        tagRepository.save(found);
        // then remove only tag entity
        tagRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
