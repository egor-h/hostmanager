import { Box } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import NoteIcon from '@material-ui/icons/Note';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect, Route, Switch, useHistory } from 'react-router-dom';
import { fetchNotes } from '../../api/note';
import { Note } from '../../models/host';
import { NoteState } from '../../state/reducers/notes';
import EditNoteWrapper from './EditNoteWrapper';
import NewNoteWrapper from './NewNoteWrapper';


const getListItem = (note: Note) => {
    return (<ListItem key={note.id + ''}>
        <ListItemAvatar>
            <Avatar>
                <NoteIcon />
            </Avatar>
        </ListItemAvatar>
        <ListItemText
            primary={note.title}
            secondary={'associated objects'}
        />
        <ListItemSecondaryAction>
            <Link to={`/notes/edit/${note.id}`}>
                <IconButton edge="end" aria-label="note">
                    <EditIcon />
                </IconButton>
            </Link>
        </ListItemSecondaryAction>
    </ListItem>)
}

const NotePage = (props: any) => {
    const dispatch = useDispatch();
    let history = useHistory();
    let notes = useSelector((state: { notes: NoteState }) => state.notes)

    if (notes.noteList.loading) {
        return (<Box>Loading..</Box>)
    }

    const addNewProtocol = () => {
        history.push('/notes/new')
    }

    return (<div>
        <List dense={true}>
            {notes.noteList.data.map(note => getListItem(note))}
            <ListItem button key={'addicon'} onClick={addNewProtocol}>
                <ListItemAvatar>
                    <Avatar>
                        <AddIcon />
                    </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Add new note" />
                <ListItemSecondaryAction>
                    <Link to={'/notes/new'}>
                        <IconButton edge="end" aria-label="addnote">
                            <AddIcon />
                        </IconButton>
                    </Link>
                </ListItemSecondaryAction>
            </ListItem>
            </List>
    </div>)
}

export default (props: any) => {
    return (<Switch>
        <Route exact path="/notes/all">
            <NotePage />
        </Route>
        <Route exact path="/notes/edit/:notesId">
            <EditNoteWrapper />
        </Route>
        <Route exact path="/notes/new">
            <NewNoteWrapper />
        </Route>
        <Route exact path="/notes/newWithHost/:hostId">
            <NewNoteWrapper />
        </Route>
        <Route exact path="/notes">
            <Redirect to="/notes/all"></Redirect>
        </Route>
    </Switch>);
}