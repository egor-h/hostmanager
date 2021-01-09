package ru.serovmp.hostmanager.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import ru.serovmp.hostmanager.entity.Note;
import ru.serovmp.hostmanager.entity.Tag;

import java.util.List;
import java.util.Optional;

@Repository
public interface TagRepository extends JpaRepository<Tag, Long> {
    Optional<Tag> findByName(@Param("name") String name);

    @Query(value = "SELECT * FROM tags WHERE name LIKE %:query% LIMIT :limit", nativeQuery = true)
    List<Tag> topRecents(@Param("query") String query, @Param("limit") long limit);
}
