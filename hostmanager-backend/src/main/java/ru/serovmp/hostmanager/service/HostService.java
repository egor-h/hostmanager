package ru.serovmp.hostmanager.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ru.serovmp.hostmanager.controller.form.HostForm;
import ru.serovmp.hostmanager.dto.HostDto;
import ru.serovmp.hostmanager.dto.HostStatsDto;
import ru.serovmp.hostmanager.dto.RecentHostDto;
import ru.serovmp.hostmanager.entity.Host;
import ru.serovmp.hostmanager.exception.HostIsNotDirException;
import ru.serovmp.hostmanager.exception.HostNotFoundException;
import ru.serovmp.hostmanager.repository.HostRepository;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class HostService {
    private static final long TREE_ROOT_ID = 1;

    private HostRepository hostRepository;

    @Autowired
    public HostService(HostRepository hostRepository) {
        this.hostRepository = hostRepository;
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
        return null;
    }

    public void delete(long id) {
        hostRepository.deleteById(id);
    }

    Host formToHost(HostForm hostForm) {
        return Host.builder()
                .name(hostForm.getName())
                .address(hostForm.getAddress())
                .isDir(hostForm.isDir())
                .build();
    }

    HostDto hostToDto(Host root) {
        var dto = HostDto.builder()
                .id(root.getId())
                .name(root.getName())
                .address(root.getAddress())
                .isDir(root.isDir())
                .build();

        if (root.getChildren() != null && root.getChildren().size() > 0) {
            dto.setChildren(root.getChildren().stream()
                    .map(this::hostToDto)
                    .collect(Collectors.toSet()));
        }

        return dto;
    }

    public List<RecentHostDto> recent(int limit) {
        return hostRepository.recent(limit).stream().map(RecentHostDto::new).collect(Collectors.toList());
    }

    public HostStatsDto stats() {
        return new HostStatsDto(hostRepository.hostsCount());
    }
}
