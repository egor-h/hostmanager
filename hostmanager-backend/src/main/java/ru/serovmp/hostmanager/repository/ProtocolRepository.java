package ru.serovmp.hostmanager.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import ru.serovmp.hostmanager.entity.Note;
import ru.serovmp.hostmanager.entity.Protocol;

import java.util.List;

@Repository
public interface ProtocolRepository extends JpaRepository<Protocol, Long> {
    @Query(value = "SELECT * FROM protocols WHERE name LIKE %:query% OR launch_type LIKE %:query% OR execution_line LIKE %:query% LIMIT :limit", nativeQuery = true)
    List<Protocol> topRecents(@Param("query") String query, @Param("limit") long limit);
}