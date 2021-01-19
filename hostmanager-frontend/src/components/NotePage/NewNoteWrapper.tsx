import { networkInterfaces } from 'os';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { createNote } from '../../api/note';
import { FullNote } from '../../models/host';
import { AppState } from '../../state/reducers';
import { findExactHostById, findHostById, flattenTree } from '../../util/tree';
import NoteForm from './NoteForm';


export default () => {
    let history = useHistory();
    let dispatch = useDispatch();
    let params = useParams<{hostId: string}>();
    let tree = useSelector((hostsBrowser: AppState) => hostsBrowser.hostsBrowser.tree);

    const submitNewNote = (note: FullNote) => {
        dispatch(createNote({...note, hosts: note.hosts.map(h => h.id)}));
        history.push('/notes');
    }

    let hostsList = flattenTree(tree.tree, h => ({id: h.id, name: h.name}));
    
    console.log(params);
    if (params.hostId) {
        let foundPreAddedHost = findExactHostById(tree.tree, +params.hostId);
        console.log(foundPreAddedHost)
        if (foundPreAddedHost) {
            const submitNewNoteBackToHost = (note: FullNote) => {
                dispatch(createNote({...note, hosts: note.hosts.map(h => h.id)}));
                history.push(`/objects/info/${foundPreAddedHost?.id}`);
            }
            return (<NoteForm title="New note" preAddedHosts={[foundPreAddedHost]} allHosts={hostsList} showDeleteButton={false} note={{id: -1, done: false, title: '', text: '', hosts: []}} onSubmit={submitNewNoteBackToHost}></NoteForm>)
        }
    }

    return (<NoteForm title="New note" allHosts={hostsList} showDeleteButton={false} note={{id: -1, done: false, title: '', text: '', hosts: []}} onSubmit={submitNewNote}></NoteForm>)
}