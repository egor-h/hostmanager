package ru.serovmp.hostmanager.service.search;

import org.springframework.data.domain.Pageable;
import ru.serovmp.hostmanager.dto.BriefSearchResultDto;

import java.util.List;

public interface Searchable<T> {
    List<T> find(String query, Pageable pageable);
}
