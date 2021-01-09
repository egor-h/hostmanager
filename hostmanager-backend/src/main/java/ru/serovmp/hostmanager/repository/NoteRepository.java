package ru.serovmp.hostmanager.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import ru.serovmp.hostmanager.entity.Host;
import ru.serovmp.hostmanager.entity.Note;

import java.util.List;

public interface NoteRepository extends JpaRepository<Note, Long> {
    @Query(value = "SELECT * FROM notes WHERE text LIKE %:query% OR title LIKE %:query% LIMIT :limit", nativeQuery = true)
    List<Note> topRecents(@Param("query") String query, @Param("limit") long limit);

}
