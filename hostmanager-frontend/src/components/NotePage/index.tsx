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
import React from 'react';
import { useSelector } from 'react-redux';
import { Link, Redirect, Route, Switch, useHistory } from 'react-router-dom';
import { Note } from '../../models/host';
import { NoteState } from '../../state/reducers/notes';
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

const ProtocolPage = (props: any) => {
    let history = useHistory();
    let notes = useSelector((state: { notes: NoteState }) => state.notes)

    if (notes.loading) {
        return (<Box>Loading..</Box>)
    }

    const addNewProtocol = () => {
        history.push('/notes/new')
    }

    return (<div>
        <List dense={true}>
            {notes.data.map(note => getListItem(note))}
            <ListItem key={'addicon'} onClick={addNewProtocol}>
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
            <ProtocolPage></ProtocolPage>
        </Route>
        <Route exact path="/notes/edit/:notesId">
            {/* <ProtocolEditWrapper /> */}
        </Route>
        <Route exact path="/notes/new">
            <NewNoteWrapper />
        </Route>
        <Route exact path="/notes">
            <Redirect to="/notes/all"></Redirect>
        </Route>
    </Switch>);
}