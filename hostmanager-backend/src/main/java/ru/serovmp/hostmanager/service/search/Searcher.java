package ru.serovmp.hostmanager.service.search;

import java.util.List;

public interface Searcher {
    enum Category {
        HOSTS, NOTES
    }
    void save(String collection, String bucket, String id, String data);
    void delete(String collection, String bucket, String id, String text);
    void removeCollection(String collection);
    List<Long> find(String collection, String bucket, String query);
    List<Long> find(String collection, String bucket, String query, int limit, int offset);
    List<Long> find(Category category, String query, int limit, int offset);
}
