import React from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ImageIcon from '@material-ui/icons/Image';
import WorkIcon from '@material-ui/icons/Work';
import BeachAccessIcon from '@material-ui/icons/BeachAccess';
import Switch from '@material-ui/core/Switch';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import { IconButton, ListSubheader, Typography } from '@material-ui/core';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import { Link, Redirect, Route, Switch as RouterSwitch, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../../state/reducers';
import { local } from '../../state/actions';

export default () => {
    let history = useHistory();
    const dispatch = useDispatch();
    const settingsState = useSelector((state: AppState) => state.local.settings);

    const settingsPage = (<div style={{ display: 'flex', flexDirection: 'column', width: '70vw', justifyContent: 'center' }}>
        <Typography variant="h4">Settings</Typography>
        <List>
            <ListSubheader>Application</ListSubheader>
            <ListItem button onClick={() => dispatch(local.settings({...settingsState, expandTreeOnStartup: !settingsState?.expandTreeOnStartup}))}>
                <ListItemText id="switch-enable-autoexpand-on-start" primary="Expand tree on start" />
                <ListItemSecondaryAction>
                    <Switch
                        edge="end"
                        onChange={(e: any, value: boolean) => {dispatch(local.settings({...settingsState, expandTreeOnStartup: value}))}}
                        checked={settingsState?.expandTreeOnStartup}
                        inputProps={{ 'aria-labelledby': 'switch-list-label-wifi' }}
                    />
                </ListItemSecondaryAction>
            </ListItem>

            <ListItem button onClick={() => history.push("/settings/users")}>
                <ListItemText primary="Edit users" />
                <ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="delete">
                        <NavigateNextIcon />
                    </IconButton>
                </ListItemSecondaryAction>
            </ListItem>

            <ListItem button>
                <ListItemText primary="Set tree root node" />
            </ListItem>
        </List>

        <List>
            <ListSubheader>Profile</ListSubheader>
            <ListItem button>
                <ListItemText primary="Change profile" />
            </ListItem>
        </List>
    </div>);

    return (<RouterSwitch>
        <Route exact path="/settings/all">
            {settingsPage}
        </Route>
        <Route exact path="/settings/users">
            <div>Users settings</div>
        </Route>
        <Route exact path="/settings">
            <Redirect to="/settings/all" />
        </Route>
    </RouterSwitch>)
}