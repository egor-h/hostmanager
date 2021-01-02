package ru.serovmp.hostmanager.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.serovmp.hostmanager.entity.Note;

public interface NoteRepository extends JpaRepository<Note, Long> {
}
