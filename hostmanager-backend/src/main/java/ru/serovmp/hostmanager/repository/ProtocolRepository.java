package ru.serovmp.hostmanager.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ru.serovmp.hostmanager.entity.Protocol;

@Repository
public interface ProtocolRepository extends JpaRepository<Protocol, Long> {
}