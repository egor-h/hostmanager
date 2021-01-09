package ru.serovmp.hostmanager.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import ru.serovmp.hostmanager.dto.RecentHostDto;
import ru.serovmp.hostmanager.entity.Host;

import java.util.List;

@Repository
public interface HostRepository extends JpaRepository<Host, Long> {

    @Query(value = "SELECT * FROM hosts ORDER BY created_at DESC LIMIT :recentLimit", nativeQuery = true)
    List<Host> recent(@Param("recentLimit") int recentLimit);

    @Query(value = "SELECT COUNT(*) FROM hosts WHERE NOT dir", nativeQuery = true)
    long hostsCount();

    @Query(value = "SELECT * FROM hosts WHERE name LIKE %:query% OR address LIKE %:query% LIMIT :limit", nativeQuery = true)
    List<Host> topRecents(@Param("query") String query, @Param("limit") long limit);
}
