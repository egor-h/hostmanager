package ru.serovmp.hostmanager.service;

import ru.serovmp.hostmanager.controller.form.ProtocolForm;
import ru.serovmp.hostmanager.dto.ProtocolDto;

import java.util.List;

public interface ProtocolService {
    List<ProtocolDto> protocols();

    ProtocolDto create(ProtocolForm protocolForm);

    ProtocolDto update(long id, ProtocolForm noteForm);

    void delete(long id);
}
