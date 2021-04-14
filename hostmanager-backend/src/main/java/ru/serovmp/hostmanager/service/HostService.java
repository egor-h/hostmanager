package ru.serovmp.hostmanager.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ru.serovmp.hostmanager.controller.form.HostForm;
import ru.serovmp.hostmanager.dto.HostDto;
import ru.serovmp.hostmanager.dto.HomePageDto;
import ru.serovmp.hostmanager.dto.RecentHostDto;
import ru.serovmp.hostmanager.dto.TagDto;
import ru.serovmp.hostmanager.entity.Host;
import ru.serovmp.hostmanager.entity.Protocol;
import ru.serovmp.hostmanager.exception.HostIsNotDirException;
import ru.serovmp.hostmanager.exception.HostNotFoundException;
import ru.serovmp.hostmanager.repository.HostRepository;
import ru.serovmp.hostmanager.repository.ProtocolRepository;
import ru.serovmp.hostmanager.repository.TagRepository;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class HostService {
    private static final long TREE_ROOT_ID = 1;

    private HostRepository hostRepository;
    private TagRepository tagRepository;
    private ProtocolRepository protocolRepository;

    @Autowired
    public HostService(HostRepository hostRepository, TagRepository tagRepository, ProtocolRepository protocolRepository) {
        this.hostRepository = hostRepository;
        this.tagRepository = tagRepository;
        this.protocolRepository = protocolRepository;
    }

    public HostDto getTreeFromRoot() {
        return getTree(TREE_ROOT_ID);
    }

    public HostDto getTree(long parentId) {
        long rootId = parentId;
        var r = hostRepository.findById(rootId)
                .orElseThrow(() -> new HostNotFoundException(String.format("Root element not found (id = %d)", parentId)));
        return hostToDto(r);
    }

    public HostDto save(long parentId, HostForm newHost) {
        var parentHost = hostRepository.findById(parentId)
                .orElseThrow(() -> new HostNotFoundException(String.format("Parent dir not found (id = %d)", parentId)));
        if (! parentHost.isDir()) {
            throw new HostIsNotDirException("Host is not directory");
        }
        var createdHost = formToHost(newHost);
        createdHost.setParent(parentHost);
        hostRepository.save(createdHost);

        return hostRepository.findById(parentId).map(this::hostToDto).get();
    }


    public void move() {

    }
    public HostDto update(long id, HostForm changedHost) {
        var foundHost = hostRepository.findById(id).orElseThrow(() -> new HostNotFoundException(String.format("Root element not found (id = %d)", id)));
        var tags = changedHost.getTags().stream()
                .map(tagRepository::findByName)
                .filter(Optional::isPresent)
                .map(Optional::get)
                .collect(Collectors.toSet());

        var protocols = changedHost.getProtocols().stream()
                .map(protocolRepository::findById)
                .filter(Optional::isPresent)
                .map(Optional::get)
                .collect(Collectors.toSet());

        foundHost.setName(changedHost.getName());
        foundHost.setAddress(changedHost.getAddress());
        foundHost.setEnabled(foundHost.isEnabled());
        foundHost.setTags(tags);
        foundHost.setProtocols(protocols);
        var updated = hostRepository.save(foundHost);
        return hostToDto(updated);
    }

    public void delete(long id) {
        var found = hostRepository.findById(id).orElseThrow(() -> new HostNotFoundException(String.format("Root element not found (id = %d)", id)));
        found.getProtocols().remove(found);
        found.getTags().remove(found);
        found.getNotes().remove(found);
        hostRepository.save(found);
        hostRepository.deleteById(id);
    }

    Host formToHost(HostForm hostForm) {
        var tags = hostForm.getTags().stream()
                .map(tagRepository::findByName)
                .map(optTag -> optTag.orElseThrow(() -> new RuntimeException("tag not found")))
                .collect(Collectors.toSet());
        var protocols = hostForm.getProtocols().stream()
                .map(protocolRepository::findById)
                .filter(Optional::isPresent)
                .map(Optional::get)
                .collect(Collectors.toSet());
        return Host.builder()
                .name(hostForm.getName())
                .address(hostForm.getAddress())
                .enabled(hostForm.isEnabled())
                .isDir(hostForm.isDir())
                .tags(tags)
                .protocols(protocols)
                .build();
    }

    HostDto hostToDto(Host root) {
        var parent = root.getParent();
        var dto = HostDto.builder()
                .id(root.getId())
                .parentId(parent == null ? -1 : parent.getId())
                .name(root.getName())
                .address(root.getAddress())
                .enabled(root.isEnabled())
                .createdAt(root.getCreatedAt())
                .isDir(root.isDir())
                .tags(root.getTags().stream().map(tag -> new TagDto(tag.getId(), tag.getName())).collect(Collectors.toSet()))
                .protocols(root.getProtocols().stream().map(Protocol::getId).collect(Collectors.toSet()))
                .build();

        if (root.getChildren() != null && root.getChildren().size() > 0) {
            dto.setChildren(root.getChildren().stream()
                    .map(this::hostToDto)
                    .collect(Collectors.toSet()));
        } else {
            dto.setChildren(new HashSet<>());
        }

        return dto;
    }

    public List<RecentHostDto> recent(int limit) {
        return hostRepository.recent(limit).stream().map(RecentHostDto::new).collect(Collectors.toList());
    }

    public long stats() {
        return hostRepository.hostsCount();
    }
}
