package ru.serovmp.hostmanager.service;

import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import ru.serovmp.hostmanager.controller.form.HostForm;
import ru.serovmp.hostmanager.dto.ObjectDto;


import java.util.List;

public interface ObjectService {
    List<ObjectDto> get(long parentId);
    List<ObjectDto> get(long parentId, Pageable pageable);
    List<ObjectDto> get(long parentId, Sort sort);

    ObjectDto create(long parentId, HostForm form);
    ObjectDto update(long id, HostForm form);
    void delete(long id);
}
