import React from "react";
import { List } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import EditIcon from '@material-ui/icons/Edit';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import AddIcon from '@material-ui/icons/Add';
import { Link, useHistory } from 'react-router-dom';
import { User } from '../../models/auth';
import { UserState } from "../../state/reducers/users";

type Props = {
    users: UserState;
}
const getListItem = (user: User, onClick: (u: User) => void) => {
    return (<ListItem button onClick={() => onClick(user)} key={user.id + ''}>
        <ListItemAvatar>
            <Avatar>
                <LocalOfferIcon />
            </Avatar>
        </ListItemAvatar>
        <ListItemText
            primary={user.name}
            secondary={user.login}
        />
        <ListItemSecondaryAction>
            <Link to={`/users/edit/${user.id}`}>
                <IconButton edge="end" aria-label="user">
                    <EditIcon />
                </IconButton>
            </Link>
        </ListItemSecondaryAction>
    </ListItem>)
}
export default (props: Props) => {
    const {data, error, loading} = props.users;
    const history = useHistory();
    
    if (loading) {
        return (<div>Loading..</div>);
    }

    const addNewUser = () => history.push('/users/new');

    return (<div>
        <List dense={true}>
            <ListItem button key={'addicon'} onClick={addNewUser}>
                <ListItemAvatar>
                    <Avatar>
                        <AddIcon />
                    </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Add new user" />
                <ListItemSecondaryAction>
                    <Link to={'/users/new'}>
                        <IconButton edge="end" aria-label="adduser">
                            <AddIcon />
                        </IconButton>
                    </Link>
                </ListItemSecondaryAction>
            </ListItem>
        {
            data.map(u => getListItem(u, usr => {console.log(usr); history.push(`/users/edit/${u.id}`)}))
        }
        </List>
    </div>);
}