package ru.serovmp.hostmanager.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ru.serovmp.hostmanager.controller.form.TreeForm;
import ru.serovmp.hostmanager.dto.TreeItemDto;
import ru.serovmp.hostmanager.entity.TreeItem;
import ru.serovmp.hostmanager.repository.TreeRepository;
import ru.serovmp.hostmanager.util.EntityToDtoMapper;

import java.util.List;

@Service
public class TreeServiceImpl implements TreeService {
    private TreeRepository treeRepository;
    private EntityToDtoMapper mapper;

    @Autowired
    public TreeServiceImpl(TreeRepository treeRepository, EntityToDtoMapper mapper) {
        this.treeRepository = treeRepository;
        this.mapper = mapper;
    }

    @Override
    public TreeItemDto tree(long id) {
        return mapper.treeItemToDto(treeRepository.findById(id).orElseThrow(() -> new RuntimeException("Tree item not found (id = " + id)));
    }

    @Override
        public TreeItemDto create(TreeForm treeForm, long parentId) {
        var parent = treeRepository.findById(parentId).orElseThrow(() -> new RuntimeException("Tree parent item not found (id = " + parentId));
        return mapper.treeItemToDto(treeRepository.save(new TreeItem(treeForm.getName(), parent, List.of())));
    }

    @Override
    public TreeItemDto update(long id, TreeForm treeForm) {
        var found = treeRepository.findById(id).orElseThrow(() -> new RuntimeException("Tree item not found (id = " + id));
        found.setName(treeForm.getName());
        return mapper.treeItemToDto(treeRepository.save(found));
    }

    @Override
    public void delete(long id) {
        treeRepository.deleteById(id);
    }
}