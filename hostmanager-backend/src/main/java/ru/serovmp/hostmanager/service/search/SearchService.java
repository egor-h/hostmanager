package ru.serovmp.hostmanager.service.search;

import ru.serovmp.hostmanager.dto.BriefSearchResultDto;

import java.util.List;

public interface SearchService {
    void indexData(String collection, String bucket, String id, String data);

    void search(String collection, String bucket, String query, int limit, int offset);

    void search(String collection, String bucket, String query);

    void indexAlldata();

    BriefSearchResultDto briefSearch(String query);

    List<BriefSearchResultDto.BriefHost> searchHosts(String query, int page);
}
