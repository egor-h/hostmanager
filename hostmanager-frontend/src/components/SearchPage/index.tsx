import { ListSubheader, TextField } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import DeleteIcon from '@material-ui/icons/Delete';
import FolderIcon from '@material-ui/icons/Folder';
import ComputerIcon from '@material-ui/icons/Computer'
import NoteIcon from '@material-ui/icons/Note'
import ReceiptIcon from '@material-ui/icons/Receipt';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import HelpIcon from '@material-ui/icons/Help';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { briefSearch } from '../../api/search';
import { AppState } from '../../state/reducers';


type IconType = "host" | "tag" | "protocol" | "note";

const getIcon = (iconType: IconType) => {
    switch (iconType) {
        case "host":
            return (<ComputerIcon />);
        case "tag":
            return (<LocalOfferIcon />);
        case "protocol":
            return (<ReceiptIcon />);
        case "note":
            return (<NoteIcon />);
        default:
            return (<HelpIcon />);
    }
}

const resultItem = (primaryText: string, secondaryText: string, iconType: IconType, onClick: () => void) => {
    return (<ListItem key={primaryText+iconType} button onClick={() => onClick()}>
        <ListItemAvatar>
            <Avatar>
                {getIcon(iconType)}
            </Avatar>
        </ListItemAvatar>
        <ListItemText
            primary={primaryText}
            secondary={secondaryText}
        />
        {/* <ListItemSecondaryAction>
          <IconButton edge="end" aria-label="searchitem">
            <DeleteIcon />
          </IconButton>
        </ListItemSecondaryAction> */}
    </ListItem>)
}

export default () => {
    const [query, setQuery] = React.useState<string>('');
    const dispatch = useDispatch();
    const searchResults = useSelector((state: AppState) => state.search);
    const history = useHistory();

    const onSubmit = (query: string) => {
        if (query.trim() !== '') {
            dispatch(briefSearch(query))
        }
    }


    let renderList: any[] = [];
    if (searchResults.data.hosts.length !== 0) {
        renderList.push(<ListSubheader key="hosts">Hosts</ListSubheader>);
        renderList.push(searchResults.data.hosts.map(h => resultItem(h.name, h.address, "host", () => history.push(`/objects/info/${h.id}`))));
    }
    if (searchResults.data.tags.length !== 0) {
        renderList.push(<ListSubheader key="tags">Tags</ListSubheader>);
        renderList.push(searchResults.data.tags.map(t => resultItem(t.name, '', "tag", () => history.push(`/tags/edit/${t.id}`))));
    }
    if (searchResults.data.protocols.length !== 0) {
        renderList.push(<ListSubheader key="protocols">Protocols</ListSubheader>);
        renderList.push(searchResults.data.protocols.map(p => resultItem(p.name, p.launchType, "protocol", () => history.push(`/protocols/edit/${p.id}`))));
    }
    if (searchResults.data.notes.length !== 0) {
        renderList.push(<ListSubheader key="notes">Notes</ListSubheader>);
        renderList.push(searchResults.data.notes.map(n => resultItem(n.title, '', "note", () => history.push(`/notes/edit/${n.id}`))));
    }
    if (false) {
        renderList.push(<ListSubheader key="settings">Settings</ListSubheader>);
    }
    return (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <form noValidate autoComplete="off" onSubmit={() => { onSubmit(query) }}>
                <TextField style={{ width: "50vw" }} autoFocus onChange={(e: any) => { setQuery(e.target.value) }} value={query} />
                <List dense={true}>
                    {renderList}
                </List>
            </form>
        </div>)
}