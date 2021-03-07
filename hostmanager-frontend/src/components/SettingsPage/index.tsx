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
import { IconButton, ListSubheader, TextField, Tooltip, Typography } from '@material-ui/core';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import { Link, Redirect, Route, RouteComponentProps, Switch as RouterSwitch, useHistory, withRouter } from 'react-router-dom';
import { connect, useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { AppState } from '../../state/reducers';
import { local } from '../../state/actions';
import { Settings } from '../../models/settings';
import SaveIcon from '@material-ui/icons/Save';
import PopupField from '../PopupField';
import { putUserSettings } from '../../api/settings';
import { Autocomplete } from '@material-ui/lab';
import { EMPTY_HOST, Host } from '../../models/host';
import { findAllDirs } from '../../util/tree';
import UserPage from '../UserPage';

const mapStateToProps = (state: AppState) => ({
    settings: state.local.settings,
    hosts: state.hostsBrowser.tree.tree
})

const mapDispatchToProps = (dispatch: any) => ({
    setSettings: bindActionCreators(local.settings, dispatch),
    putSettings: bindActionCreators(putUserSettings, dispatch)
})

type SettingsProps = {
    settings: Settings,
    hosts: Host,
    setSettings: (settings: Settings) => void,
    putSettings: (settings: Settings) => void
} & RouteComponentProps<{}>;

type SettingsState = {
    showChangeRootNode: boolean;
    showChangeNameTemplate: boolean;
    settings: Settings;
}

class SettingsList extends React.Component<SettingsProps, SettingsState> {
    constructor(props: SettingsProps) {
        super(props);

        let expandTreeOnStartup = this.props.settings.expandTreeOnStartup;
        let rootNode = this.props.settings.rootNode;

        this.state = {
            settings: {
                expandTreeOnStartup: expandTreeOnStartup,
                rootNode: rootNode
            },

            showChangeRootNode: false,
            showChangeNameTemplate: false
        }
        this.saveSettings = this.saveSettings.bind(this);
        this.handleRootHostChange = this.handleRootHostChange.bind(this);
    }

    saveSettings() {
        this.props.setSettings(this.state.settings);
        this.props.putSettings(this.state.settings);
    }

    handleRootHostChange(e: any, rootHostName: string) {
        const allDirs = findAllDirs(this.props.hosts);
        const found = allDirs.find(host => host.name === rootHostName);
        this.setState(() => ({settings: {...this.state.settings, rootNode: found === undefined ? this.state.settings.rootNode : found.id}}))
    }

    render() {
        const allDirs = findAllDirs(this.props.hosts);
        const curRootNode = allDirs.find(host => host.id === this.state.settings.rootNode);
        const curRootNodeName: Host = curRootNode === undefined ? {...EMPTY_HOST, name: `Host id=${this.state.settings.rootNode}not found`} : curRootNode;
        const settingsChanged = JSON.stringify(this.state.settings) !== JSON.stringify(this.props.settings);
        // console.log(`state: ${JSON.stringify(this.state)}`)
        // console.log(`redux: ${JSON.stringify(this.props.settings)}`)
        const settingsPage = (<div style={{ display: 'flex', flexDirection: 'column', width: '70vw', justifyContent: 'center' }}>
            <Typography variant="h4">
            {(settingsChanged) ? (
                <Tooltip title="Save settings" placement="right">
                    <IconButton onClick={() => {this.saveSettings()}} aria-label="logout">
                        <SaveIcon />
                    </IconButton>
                </Tooltip>) : (<IconButton disabled={true} onClick={() => {}} aria-label="logout"><SaveIcon /></IconButton>)}
                Settings
            </Typography>
            <List>
                <ListSubheader>Application</ListSubheader>
                <ListItem button onClick={() => {this.setState({settings: {...this.state.settings, expandTreeOnStartup: ! this.state.settings.expandTreeOnStartup}})}}>
                       <ListItemText id="switch-enable-autoexpand-on-start" primary="Expand tree on start" />
                    <ListItemSecondaryAction>
                        <Switch
                            edge="end"
                            onChange={(e: any, value: boolean) => {this.setState({settings: {...this.state.settings, expandTreeOnStartup: value}})}}
                            checked={this.state.settings.expandTreeOnStartup}
                        />
                    </ListItemSecondaryAction>
                </ListItem>

                <ListItem button onClick={() => this.props.history.push("/settings/users")}>
                    <ListItemText primary="Edit users" />
                    <ListItemSecondaryAction>
                        <IconButton edge="end" aria-label="delete">
                            <NavigateNextIcon />
                        </IconButton>
                    </ListItemSecondaryAction>
                </ListItem>

                <ListItem>
                    <ListItemText primary="Tree root node" />
                    <ListItemSecondaryAction>
                        <Autocomplete
                            id="combo-box-demo"
                            options={allDirs}
                            // onChange={this.handleLaunchTypeChange}
                            style={{ width: 300 }}
                            getOptionLabel={(option: Host) => option.name}
                            value={curRootNodeName}
                            onInputChange={this.handleRootHostChange}
                            renderInput={(params) => <TextField  size="small" {...params} label="Root node" />}
                        />
                    </ListItemSecondaryAction>
                </ListItem>

                <ListItem>
                    <ListItemText primary="Host table name template" />
                    <ListItemSecondaryAction>
                        <Tooltip title="Template with placeholders like .." placement="bottom">
                            <TextField size="small" label="Name template" style={{ width: 300 }} />
                        </Tooltip>
                    </ListItemSecondaryAction>
                </ListItem>

                <ListSubheader>Profile</ListSubheader>
                <ListItem button>
                    <ListItemText primary="Change profile" />
                </ListItem>

                <ListSubheader>Zabbix</ListSubheader>
                <ListItem>
                    <ListItemText primary="Host manager target directory" />
                    <ListItemSecondaryAction>
                        <Autocomplete
                            id="combo-box-demo"
                            options={allDirs}
                            // onChange={this.handleLaunchTypeChange}
                            style={{ width: 300 }}
                            getOptionLabel={(option: Host) => option.name}
                            value={allDirs[0]}
                            onInputChange={() => {}}
                            renderInput={(params) => <TextField  size="small" {...params}  />}
                        />
                    </ListItemSecondaryAction>
                </ListItem>
                <ListItem>
                    <ListItemText primary="Zabbix target group" />
                    <ListItemSecondaryAction>
                        <Autocomplete
                            id="combo-box-demo"
                            options={allDirs}
                            // onChange={this.handleLaunchTypeChange}
                            style={{ width: 300 }}
                            getOptionLabel={(option: Host) => option.name}
                            value={allDirs[0]}
                            onInputChange={() => {}}
                            renderInput={(params) => <TextField  size="small" {...params} />}
                        />
                    </ListItemSecondaryAction>
                </ListItem>
                <ListItem button onClick={() => {}}>
                       <ListItemText id="switch-enable-autoexpand-on-start" primary="Merge with existing entries" />
                    <ListItemSecondaryAction>
                        <Switch
                            edge="end"
                            // onChange={(e: any, value: boolean) => {this.setState({expandTreeOnStartup: value})}}
                            // checked={this.state.expandTreeOnStartup}
                        />
                    </ListItemSecondaryAction>
                </ListItem>
                <ListItem button>
                    <ListItemText primary="Begin import" />
                </ListItem>


            </List>
            {/* <ChangeRootNodePopup open={this.state.showChangeRootNode} title={'Change root node'} body={''} onNo={() => {}} onYes={(value: string) => {}} /> */}
            <PopupField open={this.state.showChangeNameTemplate} title={'Change name template'} body={'Available placeholders: ...'} onNo={() => {}} onYes={(value: string) => {}} />
        </div>);

        return (<RouterSwitch>
            <Route exact path="/settings/all">
                {settingsPage}
            </Route>
            <Route exact path="/settings/users">
                <UserPage />
            </Route>
            <Route exact path="/settings">
                <Redirect to="/settings/all" />
            </Route>
        </RouterSwitch>)
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SettingsList));
