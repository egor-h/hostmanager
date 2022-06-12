package ru.serovmp.hostmanager.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import ru.serovmp.hostmanager.controller.form.TagForm;
import ru.serovmp.hostmanager.dto.TagDto;
import ru.serovmp.hostmanager.entity.Host;
import ru.serovmp.hostmanager.entity.Tag;
import ru.serovmp.hostmanager.repository.TagRepository;
import ru.serovmp.hostmanager.util.EntityToDtoMapper;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class TagServiceImpl implements TagService {
    private TagRepository tagRepository;
    private EntityToDtoMapper entityToDtoMapper;

    @Autowired
    public TagServiceImpl(TagRepository tagRepository, EntityToDtoMapper entityToDtoMapper) {
        this.tagRepository = tagRepository;
        this.entityToDtoMapper = entityToDtoMapper;
    }

    @Override
    public List<TagDto> tags() {
        return tagRepository.findAll().stream().map(entityToDtoMapper::tagToTagDto).collect(Collectors.toList());
    }

    @Override
    public Set<Host> hostsWithTag(long tagId) {
        return tagRepository.findById(tagId)
                .orElseThrow(() -> new RuntimeException("tag " + tagId + "not found"))
                .getHosts();
    }

    @Override
    public TagDto create(TagForm tagForm) {
        var saved = tagRepository.save(new Tag(0, tagForm.getName(), new HashSet<>()));
        return entityToDtoMapper.tagToTagDto(saved);
    }

    @Override
    public TagDto update(long id, TagForm tagForm) {
        var found = tagRepository.findById(id).orElseThrow(() -> new RuntimeException("tag not found"));
        var updated = tagRepository.save(new Tag(id, tagForm.getName(), found.getHosts()));
        return entityToDtoMapper.tagToTagDto(updated);
    }

    @Override
    public void delete(long id) {
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
    }
}
