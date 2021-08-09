package ru.serovmp.hostmanager.service;

import ru.serovmp.hostmanager.dto.AuthResultDto;

public interface AuthService {
    AuthResultDto login(String username, String password);
}
