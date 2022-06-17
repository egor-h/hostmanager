package ru.serovmp.hostmanager.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import ru.serovmp.hostmanager.entity.Host;
import ru.serovmp.hostmanager.entity.TreeItem;

import java.util.Optional;

public interface TreeRepository extends JpaRepository<TreeItem, Long> {
    @Query(value = "SELECT * FROM hosts WHERE id = :id AND dir = true", nativeQuery = true)
    Optional<TreeItem> dirTree(@Param("id") long id);

}
