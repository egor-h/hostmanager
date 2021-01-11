import { FullNote, Note } from '../models/host';
import { notes } from '../state/actions';
import { setSnackbar } from '../state/actions/local';
import { doDelete, get, post, put } from './basicCrud';
import { BASE_URL, getRequest } from './common';

const API_NOTES = '/api/v1/notes';

export const fetchNotes = () => get<Note[]>({
    url: API_NOTES,
    actionBeforeFetch: notes.notes,
    actionOnSuccess: notes.notesSucceded,
    actionOnError: notes.notesFailed
});

export const createNote = (notes: Omit<FullNote, "id" | "hosts"> & {hosts: number[]}) => post<Omit<FullNote, "id" | "hosts"> & {hosts: number[]}>({
    url: API_NOTES,
    data: notes,
    onSuccess: (dispatch) => {
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

export const deleteNote = (noteId: number) => doDelete({
    url: `${API_NOTES}/${noteId}`,
    onSuccess: (dispatch) => {
        dispatch(setSnackbar({severity: 'success', message: 'Deleted note'}));
        dispatch(fetchNotes());
    },
    onError: (dispatch) => {}
});