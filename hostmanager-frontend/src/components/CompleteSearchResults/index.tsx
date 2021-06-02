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
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { fullHostSearch } from '../../api/search';
import { AppState } from '../../state/reducers';


type IconType = "goto" | "host" | "tag" | "protocol" | "note";


const resultItem = (primaryText: string, secondaryText: string, onClick: () => void) => {
    return (<ListItem key={primaryText} button onClick={() => onClick()}>
        <ListItemAvatar>
            <Avatar>
                <ComputerIcon />
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
    const searchResults = useSelector((state: AppState) => state.fullSearch);
    const history = useHistory();

    useEffect(() => {
        console.log("Full search effect");
        console.log(`${searchResults.data.hosts.length} ${searchResults.loading} ${!searchResults.error} ${query}`);
        if (searchResults.data.hosts.length === 0 && !searchResults.loading && !searchResults.error) {
            if (query.trim() !== '') {
                dispatch(fullHostSearch(query, 0));
            }
        }
    })

    let renderList: any[] = [];
    if (searchResults.data.hosts.length !== 0) {
        renderList = searchResults.data.hosts.map(searchResult => resultItem(searchResult.name, searchResult.address, () => history.push(`/objects/info/${searchResult.id}`)))
    }

    return (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
                <List dense={true}>
                    {renderList}
                </List>
        </div>)
}