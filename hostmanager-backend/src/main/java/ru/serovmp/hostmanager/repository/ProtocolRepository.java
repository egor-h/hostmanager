package ru.serovmp.hostmanager.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.serovmp.hostmanager.entity.Protocol;

public interface ProtocolRepository extends JpaRepository<Protocol, Long> {
}