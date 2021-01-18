import { FullNote, Note } from "../../models/host";
import { FULL_NOTE, FULL_NOTE_FAILED, FULL_NOTE_SUCCEDED, NOTES_LIST, NOTES_LIST_FAILED, NOTES_LIST_SUCCEDED, NOTE_FOR_HOST, NOTE_FOR_HOST_FAILED, NOTE_FOR_HOST_SUCCEDED } from "../constants";

export const notesList = () => ({
    type: NOTES_LIST
})

export const notesListFailed = () => ({
    type: NOTES_LIST_FAILED
})

export const notesListSucceded = (notes: Note[]) => ({
    type: NOTES_LIST_SUCCEDED,
    notes: notes
})

export const fullNote = () => ({
    type: FULL_NOTE
})

export const fullNoteFailed = () => ({
    type: FULL_NOTE_FAILED
})

export const fullNoteSucceded = (fullNote: FullNote) => ({
    type: FULL_NOTE_SUCCEDED,
    fullNote: fullNote
})

export const notesForHost = () => ({
    type: NOTE_FOR_HOST
})

export const notesForHostFailed = () => ({
    type: NOTE_FOR_HOST_FAILED
})

export const notesForHostSucceded = (notes: Note[]) => ({
    type: NOTE_FOR_HOST_SUCCEDED,
    notes: notes
})