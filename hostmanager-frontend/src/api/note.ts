import { FullNote, Note } from '../models/host';
import { notes } from '../state/actions';
import { setSnackbar } from '../state/actions/local';
import api from './base';
import { doDelete, get, post, put } from './basicCrud';
import { BASE_URL, getRequest } from './common';

const API_NOTES = '/api/v1/notes';

export const fetchNotes = () => get<Note[]>({
    url: API_NOTES,
    actionBeforeFetch: notes.notesList,
    actionOnSuccess: notes.notesListSucceded,
    actionOnError: notes.notesListFailed
});

export const fetchFullNote = (id: number, onSuccess?: () => void) => {
    return (dispatch: any) => {
        dispatch(notes.fullNote());
        api.get<FullNote>(`${API_NOTES}/${id}`)
        .then(resp => {
            dispatch(notes.fullNoteSucceded(resp.data));
            if (onSuccess) {
                onSuccess();
            }
        })
        .catch(error => {
            dispatch(notes.fullNoteFailed());
        });
    }
}

export const fetchNotesForHost = (hostId: number) => {
    return (dispatch: any) => {
        dispatch(notes.notesForHost());
        api.get<Note[]>(`${API_NOTES}/host/${hostId}`)
        .then(resp => {
            dispatch(notes.notesForHostSucceded(resp.data));
        })
        .catch(error => {
            dispatch(notes.notesForHostFailed());
        });
    }
}

export const createNote = (notes: Omit<FullNote, "id" | "hosts"> & {hosts: number[]}, onSuccess?: () => void) => post<Omit<FullNote, "id" | "hosts"> & {hosts: number[]}>({
    url: API_NOTES,
    data: notes,
    onSuccess: (dispatch) => {
        if (onSuccess) {
            onSuccess();
        }
        dispatch(setSnackbar({severity: 'success', message: `Created note ${notes.title}`}));
        dispatch(fetchNotes());
    },
    onError: (dispatch) => {}
});

export const saveNote = (noteId: number, notes: Omit<FullNote, "id" | "hosts"> & {hosts: number[]}) => put<Note>({
    url: `${API_NOTES}/${noteId}`,
    data: notes,
    onSuccess: (dispatch) => {
        dispatch(setSnackbar({severity: 'success', message: `Saved note ${notes.title}`}));
        dispatch(fetchNotes());
    },
    onError: (dispatch) => {}
});

export const deleteNote = (noteId: number, onSuccess?: () => void) => doDelete({
    url: `${API_NOTES}/${noteId}`,
    onSuccess: (dispatch) => {
        if (onSuccess) {
            onSuccess();
        }
        dispatch(setSnackbar({severity: 'success', message: 'Deleted note'}));
        dispatch(fetchNotes());
    },
    onError: (dispatch) => {}
});