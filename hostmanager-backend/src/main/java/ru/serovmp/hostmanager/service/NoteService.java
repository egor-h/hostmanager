package ru.serovmp.hostmanager.service;

import ru.serovmp.hostmanager.controller.form.NoteForm;
import ru.serovmp.hostmanager.dto.BriefNoteDto;
import ru.serovmp.hostmanager.dto.WholeNoteDto;
import ru.serovmp.hostmanager.entity.Note;
import ru.serovmp.hostmanager.service.search.Indexable;
import ru.serovmp.hostmanager.service.search.Searchable;

import java.util.List;

public interface NoteService extends Searchable<BriefNoteDto>, Indexable<Note> {
    List<BriefNoteDto> notes();

    WholeNoteDto fullNote(long id);

    List<BriefNoteDto> getNotesForHost(long id);

    Note create(NoteForm noteForm);

    Note update(long id, NoteForm noteForm);

    void delete(long id);
}
