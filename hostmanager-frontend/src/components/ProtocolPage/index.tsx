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
import ReceiptIcon from '@material-ui/icons/Receipt';
import React from 'react';
import { useSelector } from 'react-redux';
import { Link, Redirect, Route, Switch, useHistory } from 'react-router-dom';
import { Protocol } from '../../models/host';
import { ProtocolState } from '../../state/reducers/protocols';
import NewProtocolWrapper from './NewProtocolWrapper';
import ProtocolEditWrapper from './ProtocolEditWrapper';

const getListItem = (proto: Protocol) => {
    return (<ListItem key={proto.id + ''}>
        <ListItemAvatar>
            <Avatar>
                <ReceiptIcon />
            </Avatar>
        </ListItemAvatar>
        <ListItemText
            primary={proto.name}
            secondary={proto.launchType}
        />
        <ListItemSecondaryAction>
            <Link to={`/protocols/edit/${proto.id}`}>
                <IconButton edge="end" aria-label="tag">
                    <EditIcon />
                </IconButton>
            </Link>
        </ListItemSecondaryAction>
    </ListItem>)
}

const ProtocolPage = (props: any) => {
    let history = useHistory();
    let protocols = useSelector((state: { protocols: ProtocolState }) => state.protocols)

    if (protocols.loading) {
        return (<Box>Loading..</Box>)
    }

    const addNewProtocol = () => {
        history.push('/protocols/new')
    }

    return (<div>
        <List dense={true}>
            {protocols.data.map(proto => getListItem(proto))}
            <ListItem button key={'addicon'} onClick={addNewProtocol}>
                <ListItemAvatar>
                    <Avatar>
                        <AddIcon />
                    </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Add new protocol" />
                <ListItemSecondaryAction>
                    <Link to={'/protocols/new'}>
                        <IconButton edge="end" aria-label="addproto">
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
        <Route exact path="/protocols/all">
            <ProtocolPage></ProtocolPage>
        </Route>
        <Route exact path="/protocols/edit/:protocolId">
            <ProtocolEditWrapper />
        </Route>
        <Route exact path="/protocols/new">
            <NewProtocolWrapper></NewProtocolWrapper>
        </Route>
        <Route exact path="/protocols">
            <Redirect to="/protocols/all"></Redirect>
        </Route>
    </Switch>);
}