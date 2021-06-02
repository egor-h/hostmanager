import { ListSubheader, TextField, Typography } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import ComputerIcon from '@material-ui/icons/Computer';
import HelpIcon from '@material-ui/icons/Help';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import NoteIcon from '@material-ui/icons/Note';
import ReceiptIcon from '@material-ui/icons/Receipt';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { briefSearch, fullHostSearch } from '../../api/search';
import { AppState } from '../../state/reducers';


type IconType = "goto" | "host" | "tag" | "protocol" | "note";

const getIcon = (iconType: IconType) => {
    switch (iconType) {
        case "goto":
            return (<ArrowForwardIosIcon />);
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
        renderList.push(<ListSubheader key="hosts" onClick={() => history.push(`/search_hosts/${query}`)}>All results</ListSubheader>);
        renderList.push(searchResults.data.hosts.map(h => resultItem(h.name, h.address, "host", () => history.push(`/objects/info/${h.id}`))));
        renderList.push(resultItem(`Complete results for "${query}"`, "", "goto", () => {
            dispatch(fullHostSearch(query, 0));
            history.push(`/search_hosts/${query}`);
        }));
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
            <form noValidate autoComplete="off" onSubmit={(e) => { onSubmit(query); e.preventDefault(); }}>
                <TextField style={{ width: "50vw" }} autoFocus onChange={(e: any) => { setQuery(e.target.value) }} value={query} />
                <List dense={true}>
                    {renderList}
                </List>
            </form>
        </div>)
}