import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import StarBorder from '@material-ui/icons/StarBorder';
import ReceiptIcon from '@material-ui/icons/Receipt';
import { Host, Note, Protocol, VALIDATE_EXITCODE, VALIDATE_OUTPUT } from '../../models/host';
import { executeProtocolThunk } from '../../util/launcher';
import { useDispatch, useSelector } from 'react-redux';
import { LocalState, ProtocolResult, ProtocolResultMapByProtocolType } from '../../state/reducers/localState';
import AddIcon from '@material-ui/icons/Add';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
            maxWidth: 360,
            backgroundColor: theme.palette.background.paper,
        },
        nested: {
            paddingLeft: theme.spacing(4),
        },
    }),
);


type PropsType = {
    notes: Note[];
    host: Host;
}

const item = (protocol: Protocol, host: Host, onClick: (host: Host, protocol: Protocol) => void) => {
    return (<ListItem button key={protocol.id + ''} onClick={() => onClick(host, protocol)}>
        <ListItemIcon>
            <ReceiptIcon />
        </ListItemIcon>
        <ListItemText primary={protocol.name} />
    </ListItem>);
}

const coloredItem = (protocol: Protocol, host: Host, colored: boolean, succeded: boolean, onClick: (host: Host, protocol: Protocol) => void) => {
    let coloredStyle = { color: succeded ? "#4caf50" : "#f44336" };
    return (<ListItem button key={protocol.id + ''} onClick={() => onClick(host, protocol)}>
        <ListItemIcon>
            <ReceiptIcon style={colored ? coloredStyle : {}} />
        </ListItemIcon>
        <ListItemText primary={protocol.name} />
    </ListItem>);
}


export default function NoteList(props: PropsType) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();

    return (
        <List
            dense={true}
            component="nav"
            aria-labelledby="protocol-list-subheader"
            subheader={<ListSubheader component="div" id="protocol-list-subheader">
                    Last recent notes
                </ListSubheader>}
            className={classes.root}
        >
            {
                props.notes.map(note => (
                    <ListItem button key={note.id} onClick={() => { history.push(`/notes/edit/${note.id}`); }}>
                        <ListItemIcon>
                            <AddIcon />
                        </ListItemIcon>
                        <ListItemText primary={note.title} />
                    </ListItem>))
            }
            <ListItem button key={'addnote'} onClick={() => { history.push(`/notes/newWithHost/${props.host.id}`); }}>
                <ListItemIcon>
                    <AddIcon />
                </ListItemIcon>
                <ListItemText primary="Add new note" />
            </ListItem>
        </List>
    );
}
