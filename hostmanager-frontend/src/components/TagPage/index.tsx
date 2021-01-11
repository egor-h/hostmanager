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
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import React from 'react';
import { useSelector } from 'react-redux';
import { Link, Redirect, Route, Switch, useHistory } from 'react-router-dom';
import { Tag } from '../../models/host';
import { TagState } from '../../state/reducers/tags';
import NewTagWrapper from './NewTagWrapper';
import TagEditWrapper from './TagEditWrapper';

const getListItem = (tag: Tag) => {
    return (<ListItem key={tag.id + ''}>
        <ListItemAvatar>
            <Avatar>
                <LocalOfferIcon />
            </Avatar>
        </ListItemAvatar>
        <ListItemText
            primary={tag.name}
            secondary={'Color: #000000'}
        />
        <ListItemSecondaryAction>
            <Link to={`/tags/edit/${tag.id}`}>
                <IconButton edge="end" aria-label="tag">
                    <EditIcon />
                </IconButton>
            </Link>
        </ListItemSecondaryAction>
    </ListItem>)
}

const TagPage = () => {
    let history = useHistory();
    let tags = useSelector((state: { tags: TagState }) => state.tags)

    if (tags.loading) {
        return (<Box>Loading..</Box>)
    }

    const addNewTag = () => {
        history.push('/tags/new')
    }

    return (<div>
        <List dense={true}>
            {tags.data.map(tag => getListItem(tag))}
            <ListItem button key={'addicon'} onClick={addNewTag}>
                <ListItemAvatar>
                    <Avatar>
                        <AddIcon />
                    </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Add new tag" />
                <ListItemSecondaryAction>
                    <Link to={'/tags/new'}>
                        <IconButton edge="end" aria-label="addtag">
                            <AddIcon />
                        </IconButton>
                    </Link>
                </ListItemSecondaryAction>
            </ListItem>
        </List>
    </div>)
}

export default () => {
    return (<Switch>
        <Route exact path="/tags/all">
            <TagPage></TagPage>
        </Route>
        <Route exact path="/tags/edit/:tagId">
            <TagEditWrapper></TagEditWrapper>
        </Route>
        <Route exact path="/tags/new">
            <NewTagWrapper></NewTagWrapper>
        </Route>
        <Route exact path="/tags">
            <Redirect to="/tags/all"></Redirect>
        </Route>
    </Switch>);
}