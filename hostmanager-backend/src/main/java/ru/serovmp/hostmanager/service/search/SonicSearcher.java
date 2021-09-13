package ru.serovmp.hostmanager.service.search;

import com.github.egorh.sonic.SonicPool;
import lombok.extern.slf4j.Slf4j;

import java.util.List;
import java.util.stream.Collectors;

@Slf4j
public class SonicSearcher implements Searcher {
    public SonicSearcher(SonicPool sonicPool) {
        this.sonicPool = sonicPool;
    }

    private SonicPool sonicPool;

    @Override
    public void save(String collection, String bucket, String id, String data) {
        log.trace("Save to {} in bucket {} with id {} and text {}", collection, bucket, id, data);
        sonicPool.ingestClient().push(collection, bucket, id, data);
    }

    @Override
    public void delete(String collection, String bucket, String id, String text) {
        log.trace("Delete from {} bucket {} id {} text {}", collection, bucket, id, text);
        sonicPool.ingestClient().pop(collection, bucket, id, text);
    }

    @Override
    public void removeCollection(String collection) {
        log.trace("Remove collection {}", collection);
        sonicPool.ingestClient().flushCollection(collection);
    }

    @Override
    public List<Long> find(String collection, String bucket, String query) {
        return find(collection, bucket, query);
    }

    @Override
    public List<Long> find(String collection, String bucket, String query, int limit, int offset) {
        log.trace("Find in {} bucket {} query {}", collection, bucket, query);
        return sonicPool.searchClient().query(collection, bucket, query).stream()
                .map(Long::valueOf)
                .collect(Collectors.toList());
    }

    @Override
    public List<Long> find(Category category, String query, int limit, int offset) {
        return find(category.name().toLowerCase(), "", query, limit, offset);
    }
}
