package ru.serovmp.hostmanager.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import ru.serovmp.hostmanager.controller.form.HostForm;
import ru.serovmp.hostmanager.dto.ObjectDto;
import ru.serovmp.hostmanager.repository.ObjectRepository;
import ru.serovmp.hostmanager.repository.TreeRepository;
import ru.serovmp.hostmanager.util.EntityToDtoMapper;

import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
public class ObjectServiceImpl implements ObjectService {
    private ObjectRepository objectRepository;
    private TreeRepository treeRepository;
    private EntityToDtoMapper mapper;

    @Autowired
    public ObjectServiceImpl(ObjectRepository objectRepository, TreeRepository treeRepository, EntityToDtoMapper mapper) {
        this.objectRepository = objectRepository;
        this.treeRepository = treeRepository;
        this.mapper = mapper;
    }

    @Override
    public List<ObjectDto> get(long parentId) {
        return objectRepository.findByParentId(parentId).stream()
                .map(mapper::hostToObjectDto).collect(Collectors.toList());
    }

    @Override
    public List<ObjectDto> get(long parentId, Pageable pageable) {
        return objectRepository.findByParentId(parentId, pageable).stream()
                .map(mapper::hostToObjectDto).collect(Collectors.toList());
    }

    @Override
    public List<ObjectDto> get(long parentId, Sort sort) {
        return objectRepository.findByParentId(parentId, sort).stream()
                .map(mapper::hostToObjectDto).collect(Collectors.toList());
    }

    public ObjectDto create(long parentId, HostForm form) {
        var host = mapper.objectFormToHost(form);

        if (treeRepository.existsById(parentId)) {
            host.setParentId(parentId);
            return mapper.hostToObjectDto(objectRepository.save(host));
        };
        throw new RuntimeException("Parent tree item not found (id = " + parentId + ")");
    }

    public ObjectDto update(long id, HostForm form) {
        var found = objectRepository.findById(id).orElseThrow(() -> new RuntimeException("Not found (id = " + id + ")"));
        mapper.updateHost(form, found);
        return mapper.hostToObjectDto(objectRepository.save(found));
    }

    public void delete(long id) {
        objectRepository.deleteById(id);
    }
}
