package ru.serovmp.hostmanager.service;

import org.springframework.data.domain.Pageable;
import ru.serovmp.hostmanager.controller.form.HostForm;
import ru.serovmp.hostmanager.dto.*;
import ru.serovmp.hostmanager.entity.Host;

import java.util.List;

public interface HostService {
    void startIndex();

    String entityToIndexableText(Host e);

    List<BriefSearchResultDto.BriefHost> searchInDb(String query, Pageable pageable);

    List<BriefSearchResultDto.BriefHost> find(String query, Pageable pageable);

    List<TagDto> getTags(long id);

    List<ProtocolDto> getProtocols(long id);

    HostDto getTreeFromRoot();

    HostDto getTree(long parentId);

    HostDto save(long parentId, HostForm newHost);

    HostDto move(long hostOrDirId, long newParentId);

    HostDto update(long id, HostForm changedHost);

    void delete(long id);

    Host formToHost(HostForm hostForm);

    HostDto hostToDto(Host root);

    List<RecentHostDto> recent(int limit);

    long stats();
}
