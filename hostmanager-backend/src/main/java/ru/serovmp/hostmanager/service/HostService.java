package ru.serovmp.hostmanager.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import ru.serovmp.hostmanager.controller.form.HostForm;
import ru.serovmp.hostmanager.dto.*;
import ru.serovmp.hostmanager.entity.Host;
import ru.serovmp.hostmanager.entity.Protocol;
import ru.serovmp.hostmanager.exception.HostIsNotDirException;
import ru.serovmp.hostmanager.exception.HostNotFoundException;
import ru.serovmp.hostmanager.repository.HostRepository;
import ru.serovmp.hostmanager.repository.ProtocolRepository;
import ru.serovmp.hostmanager.repository.TagRepository;
import ru.serovmp.hostmanager.service.search.Indexable;
import ru.serovmp.hostmanager.service.search.Searchable;
import ru.serovmp.hostmanager.service.search.Searcher;
import ru.serovmp.hostmanager.util.IPUtils;

import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class HostService implements Searchable<BriefSearchResultDto.BriefHost>, Indexable<Host> {
    private static final long TREE_ROOT_ID = 1;
    public static final String SEARCH_COLLECTION = "hosts";
    public static final String SEARCH_BUCKET = "default";

    private HostRepository hostRepository;
    private TagRepository tagRepository;
    private ProtocolRepository protocolRepository;
    private Optional<Searcher> searcher;

    @Autowired
    public HostService(HostRepository hostRepository, TagRepository tagRepository, ProtocolRepository protocolRepository, Optional<Searcher> searcher) {
        this.hostRepository = hostRepository;
        this.tagRepository = tagRepository;
        this.protocolRepository = protocolRepository;
        this.searcher = searcher;
    }

    @Override
    public void startIndex() {
        if (searcher.isPresent()) {
            Searcher s = searcher.get();
            s.removeCollection(SEARCH_COLLECTION);
            hostRepository.findAll().forEach(host -> {
                s.save(SEARCH_COLLECTION, SEARCH_BUCKET, host.getId().toString(), entityToIndexableText(host));
            });
        }
    }

    @Override
    public String entityToIndexableText(Host e) {
        return e.getName()+" "+e.getAddress();
    }

    public List<BriefSearchResultDto.BriefHost> searchInDb(String query, Pageable pageable) {
        return hostRepository.findByHostNameOrAddressPagable(query, pageable)
                .stream()
                .map(h -> new BriefSearchResultDto.BriefHost(h.getId(), h.getName(), h.getAddress()))
                .collect(Collectors.toList());
    }

    public List<BriefSearchResultDto.BriefHost> find(String query, Pageable pageable) {
        if (!searcher.isPresent() || IPUtils.looksLikeIp(query.trim())) {
            return searchInDb(query, pageable);
        }
        return searcher
                .map(search -> hostRepository.findAllById(search.find(SEARCH_COLLECTION, SEARCH_BUCKET, query, pageable.getPageSize(), (int) pageable.getOffset())))
                        .stream()
                        .flatMap(e -> e.stream())
                .map(h -> new BriefSearchResultDto.BriefHost(h.getId(), h.getName(), h.getAddress()))
                .collect(Collectors.toList());
    }

    public List<TagDto> getTags(long id) {
        var foundHost = hostRepository.findById(id).orElseThrow(() -> new HostNotFoundException("Host " + id + " not found"));
        return foundHost.getTags().stream()
                .map(tag -> new TagDto(tag.getId(), tag.getName()))
                .collect(Collectors.toList());
    }

    public List<ProtocolDto> getProtocols(long id) {
        var foundHost = hostRepository.findById(id).orElseThrow(() -> new HostNotFoundException("Host " + id + " not found"));
                    return foundHost.getProtocols().stream()
                .map(protocol -> new ProtocolDto(protocol.getId(), protocol.getName(), protocol.getExecutionLine(), protocol.getLaunchType().name(), protocol.getValidationRegex(), protocol.getExpectedExitCode()))
                .collect(Collectors.toList());
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
        createdHost.setCreatedAt(new Date());
        var saved = hostRepository.save(createdHost);

        searcher.ifPresent(search -> {
            search.save(SEARCH_COLLECTION, SEARCH_BUCKET, saved.getId().toString(), entityToIndexableText(saved));
        });
        return hostRepository.findById(parentId).map(this::hostToDto).get();
    }


    public HostDto move(long hostOrDirId, long newParentId) {
        var srcHost = hostRepository.findById(hostOrDirId)
                .orElseThrow(() -> new HostNotFoundException("host " + hostOrDirId + " not found"));
        var destinationDir = hostRepository.findById(newParentId)
                .filter(Host::isDir)
                .orElseThrow(() -> new HostNotFoundException("host " + newParentId + " not found or is not dir"));

        srcHost.setParent(destinationDir);
        hostRepository.save(srcHost);
        return getTree(newParentId);
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
        foundHost.setEnabled(changedHost.isEnabled());
        foundHost.setPort(changedHost.getPort());
        foundHost.setTags(tags);
        foundHost.setProtocols(protocols);
        var updated = hostRepository.save(foundHost);
        searcher.ifPresent(search -> {
            search.save(SEARCH_COLLECTION, SEARCH_BUCKET, updated.getId().toString(), entityToIndexableText(updated));
        });
        return hostToDto(updated);
    }

    public void delete(long id) {
        var found = hostRepository.findById(id).orElseThrow(() -> new HostNotFoundException(String.format("Root element not found (id = %d)", id)));
        found.getProtocols().remove(found);
        found.getTags().remove(found);
        found.getNotes().remove(found);
        var saved = hostRepository.save(found);
        hostRepository.deleteById(id);
        searcher.ifPresent(search -> {
            search.delete(SEARCH_COLLECTION, SEARCH_BUCKET, String.valueOf(id), entityToIndexableText(saved));
        });
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
                .port(hostForm.getPort())
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
                .port(root.getPort())
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
