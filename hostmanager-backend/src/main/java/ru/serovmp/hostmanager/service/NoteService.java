package ru.serovmp.hostmanager.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import ru.serovmp.hostmanager.controller.form.NoteForm;
import ru.serovmp.hostmanager.dto.BriefNoteDto;
import ru.serovmp.hostmanager.dto.WholeNoteDto;
import ru.serovmp.hostmanager.entity.Host;
import ru.serovmp.hostmanager.entity.Note;
import ru.serovmp.hostmanager.repository.HostRepository;
import ru.serovmp.hostmanager.repository.NoteRepository;
import ru.serovmp.hostmanager.service.search.Indexable;
import ru.serovmp.hostmanager.service.search.Searchable;
import ru.serovmp.hostmanager.service.search.Searcher;

import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class NoteService implements Searchable<BriefNoteDto>, Indexable<Note> {
    public static final String SEARCH_COLLECTION = "notes";
    public static final String SEARCH_BUCKET = "default";

    private NoteRepository noteRepository;
    private HostRepository hostRepository;
    private Optional<Searcher> searcher;

    @Autowired
    public NoteService(NoteRepository noteRepository, HostRepository hostRepository, Optional<Searcher> searcher) {
        this.noteRepository = noteRepository;
        this.hostRepository = hostRepository;
        this.searcher = searcher;
    }

    @Override
    public void startIndex() {
        if (searcher.isPresent()) {
            Searcher s = searcher.get();
            s.removeCollection(SEARCH_COLLECTION);
            noteRepository.findAll().forEach(note -> {
                s.save(SEARCH_COLLECTION, SEARCH_BUCKET, note.getId().toString(), note.getText()+" "+note.getTitle());
            });
        }
    }

    @Override
    public String entityToIndexableText(Note e) {
        return String.join(" ", e.getText(), e.getTitle());
    }

    @Override
    public List<BriefNoteDto> find(String query, Pageable pageable) {
        if (!searcher.isPresent()) {
            return noteRepository.findByTextOrTitle(query, pageable)
                    .stream()
                    .map(n -> new BriefNoteDto(n.getId(), n.getTitle(), n.getCreatedAt(), n.isDone()))
                    .collect(Collectors.toList());
        }

        return searcher
                .map(search -> noteRepository.findAllById(search.find(SEARCH_COLLECTION, SEARCH_BUCKET, query, pageable.getPageSize(), (int) pageable.getOffset())))
                .stream()
                .flatMap(e -> e.stream())
                .map(n -> new BriefNoteDto(n.getId(), n.getTitle(), n.getCreatedAt(), n.isDone()))
                .collect(Collectors.toList());
    }

    public Note formToNote(NoteForm noteForm) {
        var doneAt = noteForm.isDone() ? new Date() : null;
        var hosts = hostRepository.findAllById(noteForm.getHosts()).stream().collect(Collectors.toSet());
        return Note.builder()
                .title(noteForm.getTitle())
                .text(noteForm.getText())
                .done(noteForm.isDone())
                .createdAt(new Date())
                .doneAt(doneAt)
                .hosts(hosts)
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

    public List<BriefNoteDto> notes() {
        return noteRepository.findAll().stream().map(this::noteToBrief).collect(Collectors.toList());
    }

    public WholeNoteDto fullNote(long id) {
        return noteRepository.findById(id)
                .map(this::noteToWhole)
                .orElseThrow(() -> new RuntimeException("note " + id + " not found"));
    }

    public List<BriefNoteDto> getNotesForHost(long id) {
        return hostRepository
                .findById(id)
                .orElseThrow(() -> new RuntimeException(String.format("user id = %d not found", id)))
                .getNotes()
                .stream()
                .limit(5)
                .map(this::noteToBrief)
                .collect(Collectors.toList());
    }

    public Note create(NoteForm noteForm) {
        var note = formToNote(noteForm);
        var savedNote = noteRepository.saveAndFlush(note);
        var associatedHosts = hostRepository.findAllById(noteForm.getHosts());
        associatedHosts.forEach(host -> {
            host.getNotes().add(savedNote);
            hostRepository.save(host);
        });

        searcher.ifPresent(search -> {
            search.save(SEARCH_COLLECTION, SEARCH_BUCKET, savedNote.getId().toString(), entityToIndexableText(savedNote));
        });
        return savedNote;
    }

    public Note update(long id, NoteForm noteForm) {
        var found = noteRepository.findById(id).orElseThrow(() -> new RuntimeException("note " + id + " not found"));
        found.setTitle(noteForm.getTitle());
        found.setText(noteForm.getText());
        found.setDone(noteForm.isDone());
        found.setDoneAt(noteForm.isDone() ? new Date() : null);
        var saved = noteRepository.save(found);
        searcher.ifPresent(search -> {
            search.save(SEARCH_COLLECTION, SEARCH_BUCKET, saved.getId().toString(), entityToIndexableText(saved));
        });
        return saved;
    }

    public void delete(long id) {
        var found = noteRepository.findById(id).orElseThrow(() -> new RuntimeException(String.format("Note %d not found", id)));
        found.getHosts().stream().forEach(host -> {
            if (host.getNotes().contains(found)) {
                host.getNotes().remove(found);
            }
        });
        searcher.ifPresent(search -> {
            search.delete(SEARCH_COLLECTION, SEARCH_BUCKET, found.getId().toString(), entityToIndexableText(found));
        });
        noteRepository.deleteById(id);
    }
}
