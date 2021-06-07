import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import ComputerIcon from '@material-ui/icons/Computer';
import React, { useEffect } from 'react';
import { WithTranslation, withTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { fullHostSearch } from '../../api/search';
import { AppState } from '../../state/reducers';


export const SEARCH_RESULTS_PAGE_SIZE = 20;

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

export default withTranslation()((props: WithTranslation) => {
    const dispatch = useDispatch();
    const searchResults = useSelector((state: AppState) => state.fullSearch);
    const history = useHistory();
    let { query } = useParams<{query: string}>();
    const { t } = props;
    
    let renderList = searchResults.data.hosts.map(searchResult => resultItem(searchResult.name, searchResult.address, () => history.push(`/objects/info/${searchResult.id}`)));
    if ((searchResults.data.hosts.length % SEARCH_RESULTS_PAGE_SIZE) === 0) {
        renderList.push(resultItem(t("full_search_load_more"), "", () => dispatch(fullHostSearch(query, searchResults.data.page+1))));
    }

    return (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
                <List dense={true}>
                    {renderList}
                </List>
        </div>)
})