import { networkInterfaces } from 'os';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { createNote } from '../../api/note';
import { FullNote } from '../../models/host';
import { AppState } from '../../state/reducers';
import { flattenTree } from '../../util/tree';
import NoteForm from './NoteForm';


export default () => {
    let history = useHistory();
    let dispatch = useDispatch();
    let tree = useSelector((hostsBrowser: AppState) => hostsBrowser.hostsBrowser.tree);

    const submitNewTag = (note: FullNote) => {
        console.log(note)
        dispatch(createNote({...note, hosts: note.hosts.map(h => h.id)}))
        history.push('/notes')
    }

    let hostsList = flattenTree(tree.tree, h => ({id: h.id, name: h.name}));

    return (<NoteForm title="New note" allHosts={hostsList} showDeleteButton={false} note={{id: -1, done: false, title: '', text: '', hosts: []}} onSubmit={submitNewTag}></NoteForm>)
}