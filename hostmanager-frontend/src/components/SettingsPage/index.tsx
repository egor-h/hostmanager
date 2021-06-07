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
import { Settings, ZabbixGroup } from '../../models/settings';
import SaveIcon from '@material-ui/icons/Save';
import PopupField from '../PopupField';
import { getZabbixGroups, putUserSettings, syncDirToZabbix } from '../../api/settings';
import { Autocomplete } from '@material-ui/lab';
import { EMPTY_HOST, Host } from '../../models/host';
import { findAllDirs } from '../../util/tree';
import UserPage from '../UserPage';
import { useTranslation, WithTranslation, withTranslation } from 'react-i18next';

const mapStateToProps = (state: AppState) => ({
    settings: state.local.settings,
    zabbixGroups: state.local.zabbixGroups,
    hosts: state.hostsBrowser.tree.tree
})

const mapDispatchToProps = (dispatch: any) => ({
    setSettings: bindActionCreators(local.settings, dispatch),
    putSettings: bindActionCreators(putUserSettings, dispatch),
    loadZabbixGroups: bindActionCreators(getZabbixGroups, dispatch),
    beginZabbixImport: bindActionCreators(syncDirToZabbix, dispatch)
})

type SettingsProps = {
    settings: Settings,
    hosts: Host,
    setSettings: (settings: Settings) => void,
    putSettings: (settings: Settings) => void,
    zabbixGroups: {loading: boolean, data: ZabbixGroup[], error: boolean},
    loadZabbixGroups: () => void,
    beginZabbixImport: (hostsManDir: number, zabbixGroup: string, merge: boolean) => void

} & RouteComponentProps<{}> & WithTranslation;

type SettingsState = {
    showChangeRootNode: boolean;
    showChangeNameTemplate: boolean;
    settings: Settings;
    hostsmanGroupId: number;
    zabbixGroupId: string;
    zabbixMergeEntries: boolean;
}

class SettingsList extends React.Component<SettingsProps, SettingsState> {
    constructor(props: SettingsProps) {
        super(props);

        let expandTreeOnStartup = this.props.settings.expandTreeOnStartup;
        let rootNode = this.props.settings.rootNode;

        this.state = {
            settings: {
                expandTreeOnStartup: expandTreeOnStartup,
                rootNode: rootNode,
            },
            hostsmanGroupId: rootNode,
            zabbixGroupId: '',
            zabbixMergeEntries: false,
            showChangeRootNode: false,
            showChangeNameTemplate: false
        }
        this.saveSettings = this.saveSettings.bind(this);
        this.handleRootHostChange = this.handleRootHostChange.bind(this);
        this.handleTargetHostsManDir = this.handleTargetHostsManDir.bind(this);
        this.handleTargetZabbixGroup = this.handleTargetZabbixGroup.bind(this);
    }

    componentDidMount() {
        this.props.loadZabbixGroups();
    }

    saveSettings() {
        this.props.setSettings(this.state.settings);
        this.props.putSettings(this.state.settings);
    }

    handleRootHostChange(e: any, rootHostName: string) {
        console.log(`Root host change`);
        console.log(rootHostName);
        const allDirs = findAllDirs(this.props.hosts);
        const found = allDirs.find(host => host.name === rootHostName);
        this.setState(() => ({settings: {...this.state.settings, rootNode: found === undefined ? this.state.settings.rootNode : found.id}}));
    }

    handleTargetHostsManDir(e: any, hostsDir: string) {
        const allDirs = findAllDirs(this.props.hosts);
        const found = allDirs.find(host => host.name === hostsDir);
        this.setState({hostsmanGroupId: found === undefined ? this.state.settings.rootNode : found.id});
    }

    handleTargetZabbixGroup(e: any, zabbixGroupName: string) {
        const zabbixGroup = this.props.zabbixGroups.data.find(v => v.name == zabbixGroupName)
        if (zabbixGroup) {
            this.setState({zabbixGroupId: zabbixGroup.groupId});
        }
    }

    render() {
        const t = this.props.t;
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
                {t("settings_page_title")}
            </Typography>
            <List>
                <ListSubheader>{t("settings_page_application_subheader")}</ListSubheader>
                <ListItem button onClick={() => {this.setState({settings: {...this.state.settings, expandTreeOnStartup: ! this.state.settings.expandTreeOnStartup}})}}>
                       <ListItemText id="switch-enable-autoexpand-on-start" primary={t("settings_page_application_expand_tree_on_start")} />
                    <ListItemSecondaryAction>
                        <Switch
                            edge="end"
                            onChange={(e: any, value: boolean) => {this.setState({settings: {...this.state.settings, expandTreeOnStartup: value}})}}
                            checked={this.state.settings.expandTreeOnStartup}
                        />
                    </ListItemSecondaryAction>
                </ListItem>

                <ListItem button onClick={() => this.props.history.push("/users")}>
                    <ListItemText primary={t("settings_page_application_edit_users")} />
                    <ListItemSecondaryAction>
                        <IconButton edge="end" aria-label="delete">
                            <NavigateNextIcon />
                        </IconButton>
                    </ListItemSecondaryAction>
                </ListItem>

                <ListItem>
                    <ListItemText primary={t("settings_page_application_tree_root_node")} />
                    <ListItemSecondaryAction>
                        <Autocomplete
                            id="combo-box-demo"
                            options={allDirs}
                            // onChange={this.handleLaunchTypeChange}
                            style={{ width: 300 }}
                            getOptionLabel={(option: Host) => option.name}
                            value={curRootNodeName}
                            onChange={this.handleRootHostChange}
                            renderInput={(params) => <TextField  size="small" {...params} label={t("settings_page_application_tree_root_node_sub")} />}
                        />
                    </ListItemSecondaryAction>
                </ListItem>

                <ListItem>
                    <ListItemText primary={t("settings_page_application_host_table_name_template")} />
                    <ListItemSecondaryAction>
                        <Tooltip title={t("settings_page_application_host_table_name_template_tooltip")} placement="bottom">
                            <TextField size="small" label={t("settings_page_application_host_table_name_template_field")} style={{ width: 300 }} />
                        </Tooltip>
                    </ListItemSecondaryAction>
                </ListItem>

                <ListSubheader>{t("settings_page_profile_subheader")}</ListSubheader>
                <ListItem button>
                    <ListItemText primary={t("settings_page_profile_change_profile")} />
                </ListItem>

                <ListSubheader>Zabbix</ListSubheader>
                <ListItem>
                    <ListItemText primary={t("settings_page_zabbix_hostsmanager_target_dir")} />
                    <ListItemSecondaryAction>
                        <Autocomplete
                            id="combo-box-demo"
                            options={allDirs}
                            // onChange={this.handleLaunchTypeChange}
                            style={{ width: 300 }}
                            getOptionLabel={(option: Host) => option.name}
                            value={allDirs[0]}
                            onInputChange={this.handleTargetHostsManDir}
                            renderInput={(params) => <TextField  size="small" {...params}  />}
                        />
                    </ListItemSecondaryAction>
                </ListItem>
                <ListItem>
                    <ListItemText primary={t("settings_page_zabbix_zabbix_target_group")} />
                    <ListItemSecondaryAction>
                        <Autocomplete
                            id="combo-box-demo"
                            loading={this.props.zabbixGroups.loading}
                            options={this.props.zabbixGroups.data}
                            // onChange={this.handleLaunchTypeChange}
                            style={{ width: 300 }}
                            getOptionLabel={(option: ZabbixGroup) => option.name}
                            value={undefined}
                            onInputChange={this.handleTargetZabbixGroup}
                            renderInput={(params) => <TextField  size="small" {...params} />}
                        />
                    </ListItemSecondaryAction>
                </ListItem>
                <ListItem button onClick={() => {}}>
                       <ListItemText id="switch-merge-with-existing" primary={t("settings_page_zabbix_merge_with_existing")} />
                    <ListItemSecondaryAction>
                        <Switch
                            edge="end"
                            onChange={(e: any, value: boolean) => {this.setState({zabbixMergeEntries: value})}}
                            checked={this.state.zabbixMergeEntries}
                        />
                    </ListItemSecondaryAction>
                </ListItem>
                <ListItem button>
                    <ListItemText onClick={() => this.props.beginZabbixImport(this.state.hostsmanGroupId, this.state.zabbixGroupId, this.state.zabbixMergeEntries)} primary={t("settings_page_zabbix_begin_import")} />
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

export default withTranslation()(connect(mapStateToProps, mapDispatchToProps)(withRouter(SettingsList)));
