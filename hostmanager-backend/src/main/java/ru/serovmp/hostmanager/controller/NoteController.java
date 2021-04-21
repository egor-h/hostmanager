
package ru.serovmp.hostmanager.controller;

import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.serovmp.hostmanager.controller.form.NoteForm;
import ru.serovmp.hostmanager.dto.BriefNoteDto;
import ru.serovmp.hostmanager.dto.HostDto;
import ru.serovmp.hostmanager.dto.WholeNoteDto;
import ru.serovmp.hostmanager.entity.Host;
import ru.serovmp.hostmanager.entity.Note;
import ru.serovmp.hostmanager.repository.HostRepository;
import ru.serovmp.hostmanager.repository.NoteRepository;
import ru.serovmp.hostmanager.service.HostService;

import java.util.Date;
import java.util.HashSet;
import java.util.stream.Collectors;

@SecurityRequirement(name = "bearer-key")
@RestController
@RequestMapping("/api/v1/notes")
public class NoteController {

    private NoteRepository noteRepository;
    private HostRepository hostRepository;

    @Autowired
    public NoteController(NoteRepository noteRepository, HostRepository hostRepository) {
        this.noteRepository = noteRepository;
        this.hostRepository = hostRepository;
    }

    public Note formToNote(NoteForm noteForm) {
        var doneAt = noteForm.isDone() ? new Date() : null;
        var hosts = hostRepository.findAllById(noteForm.getHosts());
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
                .hosts(note.getHosts().stream().map(Host::getId).collect(Collectors.toSet()))
                .build();
    }

    @GetMapping
    public ResponseEntity notes() {
        return ResponseEntity.ok(noteRepository.findAll().stream().map(this::noteToBrief).collect(Collectors.toSet()));
    }

    @GetMapping("/{id}/hosts")
    public ResponseEntity hostListForNote() {
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{id}")
    public ResponseEntity fullNote(@PathVariable("id") long id) {
        return noteRepository.findById(id)
                .map(this::noteToWhole)
                .map(ResponseEntity::ok)
                .orElseThrow(() -> new RuntimeException("note " + id + " not found"));
    }

    @GetMapping("/host/{id}")
    public ResponseEntity getNotesForHost(@PathVariable("id") long id) {
        return ResponseEntity.ok(hostRepository
                .findById(id)
                .orElseThrow(() -> new RuntimeException(String.format("user id = %d not found", id)))
                .getNotes()
                .stream()
                .limit(5)
                .map(this::noteToBrief)
                .collect(Collectors.toSet()));
    }

    @PostMapping
    public ResponseEntity addNote(@RequestBody NoteForm noteForm) {
        var note = formToNote(noteForm);
        var savedNote = noteRepository.saveAndFlush(note);
        var associatedHosts = hostRepository.findAllById(noteForm.getHosts());
        associatedHosts.forEach(host -> {
            host.getNotes().add(savedNote);
            hostRepository.save(host);
        });

        return ResponseEntity.ok(savedNote);
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
        var found = noteRepository.findById(id).orElseThrow(() -> new RuntimeException(String.format("Note %d not found", id)));
        found.getHosts().stream().forEach(host -> {
            if (host.getNotes().contains(found)) {
                host.getNotes().remove(found);
            }
        });
        noteRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
