package ru.serovmp.hostmanager.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.serovmp.hostmanager.controller.form.NoteForm;
import ru.serovmp.hostmanager.dto.BriefNoteDto;
import ru.serovmp.hostmanager.dto.WholeNoteDto;
import ru.serovmp.hostmanager.entity.Note;
import ru.serovmp.hostmanager.repository.NoteRepository;

import java.util.Date;
import java.util.HashSet;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/v1/notes")
public class NoteController {

    private NoteRepository noteRepository;

    public NoteController(NoteRepository noteRepository) {
        this.noteRepository = noteRepository;
    }

    public Note formToNote(NoteForm noteForm) {
        var doneAt = noteForm.isDone() ? new Date() : null;
        return Note.builder()
                .title(noteForm.getTitle())
                .text(noteForm.getText())
                .done(noteForm.isDone())
                .createdAt(new Date())
                .doneAt(doneAt)
                .hosts(new HashSet<>())
                .build();
    }

    public BriefNoteDto noteToBrief(Note note) {
        return new BriefNoteDto(note.getId(), note.getTitle(), note.getCreatedAt(), note.isDone());
    }

    public WholeNoteDto noteToWhole(Note note) {
        return WholeNoteDto.builder()
                .id(note.getId())
                .title(note.getTitle())
                .text(note.getText())
                .createdAt(note.getCreatedAt())
                .done(note.isDone())
                .doneAt(note.getDoneAt())
                .build();
    }

    @GetMapping
    public ResponseEntity notes() {
        return ResponseEntity.ok(noteRepository.findAll().stream().map(this::noteToBrief).collect(Collectors.toSet()));
    }

    @GetMapping("/{id}")
    public ResponseEntity fullNote(@PathVariable("id") long id) {
        return noteRepository.findById(id)
                .map(this::noteToWhole)
                .map(ResponseEntity::ok)
                .orElseThrow(() -> new RuntimeException("note " + id + " not found"));
    }

    @PostMapping
    public ResponseEntity addNote(@RequestBody NoteForm noteForm) {
        return ResponseEntity.ok(noteRepository.save(formToNote(noteForm)));
    }

    @PutMapping("/{id}")
    public ResponseEntity update(@PathVariable("id") long id, @RequestBody NoteForm noteForm) {
        var found = noteRepository.findById(id).orElseThrow(() -> new RuntimeException("note " + id + " not found"));
        found.setTitle(noteForm.getTitle());
        found.setText(noteForm.getText());
        found.setDone(noteForm.isDone());
        found.setDoneAt(noteForm.isDone() ? new Date() : null);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity delete(@PathVariable("id") long id) {
        noteRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
