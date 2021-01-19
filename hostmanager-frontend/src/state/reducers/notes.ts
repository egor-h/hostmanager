import { EMPTY_NOTE, FullNote, Note } from "../../models/host"
import { FULL_NOTE, FULL_NOTE_FAILED, FULL_NOTE_SUCCEDED, NOTES_LIST, NOTES_LIST_FAILED, NOTES_LIST_SUCCEDED, NOTE_FOR_HOST, NOTE_FOR_HOST_FAILED, NOTE_FOR_HOST_SUCCEDED } from "../constants"

const initialState = {
    notesForHost: {
        hostId: -1,
        loading: false,
        data: [],
        error: false 
    },
    fullNote: {
        loading: false,
        data: EMPTY_NOTE,
        error: false
    },
    noteList: {
        loading: false,
        data: [],
        error: false
    }
}

export type NotesForHostState = {
    hostId: number;
    loading: boolean;
    data: Note[];
    error: boolean;
}

export type FullNoteState = {
    loading: boolean;
    data: FullNote;
    error: boolean;
}

export type NoteListState = {
    loading: boolean;
    data: [];
    error: boolean;
}

export type NoteState = {
    notesForHost: NotesForHostState;
    fullNote: FullNoteState;
    noteList: NoteListState;
}

export const notes = (state = initialState, action: any) => {
    switch(action.type) {
        case NOTES_LIST:
            return {
                ...state,
                noteList: {
                    loading: true,
                    data: [],
                    error: false
                }
            }
        case NOTES_LIST_SUCCEDED:
            return {
                ...state,
                noteList: {
                    loading: false,
                    data: action.notes,
                    error: false
                }
            }
        case NOTES_LIST_FAILED:
            return {
                ...state,
                noteList: {
                    loading: false,
                    data: [],
                    error: true
                }
            }
            case FULL_NOTE:
            return {
                ...state,
                fullNote: {
                    loading: true,
                    data: [],
                    error: false
                }
            }
        case FULL_NOTE_SUCCEDED:
            return {
                ...state,
                fullNote: {
                    loading: false,
                    data: action.fullNote,
                    error: false
                }
            }
        case FULL_NOTE_FAILED:
            return {
                ...state,
                fullNote: {
                    loading: false,
                    data: [],
                    error: true
                }
            }
            case NOTE_FOR_HOST:
            return {
                ...state,
                notesForHost: {
                    loading: true,
                    data: [],
                    error: false
                }
            }
        case NOTE_FOR_HOST_SUCCEDED:
            return {
                ...state,
                notesForHost: {
                    loading: false,
                    data: action.notes,
                    error: false
                }
            }
        case NOTE_FOR_HOST_FAILED:
            return {
                ...state,
                notesForHost: {
                    loading: false,
                    data: [],
                    error: true
                }
            }
        default:
            return state
    }

}