import { FullNote } from '../models/host';
import { notes } from '../state/actions';
import { BASE_URL, getRequest } from './common';

const API_NOTES = `${BASE_URL}/api/v1/notes`;

export const fetchNotes = () => {
    return getRequest({
        url: API_NOTES,
        actionBeforeFetch: notes.notes,
        actionOnSuccess: notes.notesSucceded,
        actionOnError: notes.notesFailed
    });
}

export const createNote = (notes: Omit<FullNote, "id" | "hosts"> & {hosts: number[]}) => {
    return (dispatch: any) => {
        fetch(API_NOTES, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(notes)
        }).then(res => {
            console.log(res);
            dispatch(fetchNotes());
        }).catch(error => console.error(error));
    }
}

export const saveNote = (noteId: number, notes: Omit<FullNote, "id" | "hosts"> & {hosts: number[]}) => {
    return (dispatch: any) => {
        fetch(`${API_NOTES}/${noteId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(notes)
        }).then(res => {
            console.log(res);
            dispatch(fetchNotes());
        }).catch(error => console.error(error));
    }
}

export const deleteNote = (noteId: number) => {
    return (dispatch: any) => {
        fetch(`${API_NOTES}/${noteId}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' }
        }).then(res => {
            console.log(res);
            dispatch(fetchNotes());
        }).catch(error => console.error(error));
    }
}