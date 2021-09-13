
package ru.serovmp.hostmanager.controller;

import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.serovmp.hostmanager.controller.form.NoteForm;
import ru.serovmp.hostmanager.service.NoteService;

@SecurityRequirement(name = "bearer-key")
@RestController
@RequestMapping("/api/v1/notes")
public class NoteController {

    private NoteService noteService;

    @Autowired
    public NoteController(NoteService noteService) {
        this.noteService = noteService;
    }

    @GetMapping
    public ResponseEntity notes() {
        return ResponseEntity.ok(noteService.notes());
    }

    @GetMapping("/{id}/hosts")
    public ResponseEntity hostListForNote() {
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{id}")
    public ResponseEntity fullNote(@PathVariable("id") long id) {
        return ResponseEntity.ok(noteService.fullNote(id));
    }

    @GetMapping("/host/{id}")
    public ResponseEntity getNotesForHost(@PathVariable("id") long id) {
        return ResponseEntity.ok(noteService.getNotesForHost(id));
    }

    @PostMapping
    public ResponseEntity addNote(@RequestBody NoteForm noteForm) {
        return ResponseEntity.ok(noteService.create(noteForm));
    }

    @PutMapping("/{id}")
    public ResponseEntity update(@PathVariable("id") long id, @RequestBody NoteForm noteForm) {
        return ResponseEntity.ok(noteService.update(id, noteForm));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity delete(@PathVariable("id") long id) {
        noteService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
