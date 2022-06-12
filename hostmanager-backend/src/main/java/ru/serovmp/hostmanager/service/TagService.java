package ru.serovmp.hostmanager.service;

import ru.serovmp.hostmanager.controller.form.TagForm;
import ru.serovmp.hostmanager.dto.TagDto;
import ru.serovmp.hostmanager.entity.Host;

import java.util.List;
import java.util.Set;

public interface TagService {
    List<TagDto> tags();

    Set<Host> hostsWithTag(long tagId);

    TagDto create(TagForm tagForm);

    TagDto update(long id, TagForm tagForm);

    void delete(long id);
}
