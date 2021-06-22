import { IconButton, ListSubheader, TextField, Tooltip, Typography } from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Switch from '@material-ui/core/Switch';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import SaveIcon from '@material-ui/icons/Save';
import EditIcon from '@material-ui/icons/Edit';
import { Autocomplete } from '@material-ui/lab';
import React from 'react';
import { WithTranslation, withTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { Redirect, Route, RouteComponentProps, Switch as RouterSwitch, withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { getZabbixGroups, putUserSettings, syncDirToZabbix } from '../../api/settings';
import { createSubnet, deleteSubnet, fetchSubnets, saveSubnet, SubnetApi } from '../../api/subnets';
import { EMPTY_HOST, Host } from '../../models/host';
import { Settings, ZabbixGroup } from '../../models/settings';
import { local } from '../../state/actions';
import { setSnackbar } from '../../state/actions/local';
import { AppState } from '../../state/reducers';
import { ServiceInfoType } from '../../state/reducers/serviceInfo';
import { Subnets } from '../../state/reducers/subnets';
import { findAllDirs } from '../../util/tree';
import PopupField from '../PopupField';
import UserPage from '../UserPage';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import { Subnet } from '../../models/stat';

const mapStateToProps = (state: AppState) => ({
    settings: state.local.settings,
    zabbixGroups: state.local.zabbixGroups,
    hosts: state.hostsBrowser.tree.tree,
    serviceInfo: state.serviceInfo,
    subnets: state.subnets
})

const mapDispatchToProps = (dispatch: any) => ({
    setSettings: bindActionCreators(local.settings, dispatch),
    putSettings: bindActionCreators(putUserSettings, dispatch),
    loadZabbixGroups: bindActionCreators(getZabbixGroups, dispatch),
    beginZabbixImport: bindActionCreators(syncDirToZabbix, dispatch),
    setSnackbar: bindActionCreators(setSnackbar, dispatch),

    fetchSubnets: bindActionCreators(fetchSubnets, dispatch),
    createSubnet: bindActionCreators(createSubnet, dispatch),
    saveSubnet: bindActionCreators(saveSubnet, dispatch),
    deleteSubnet: bindActionCreators(deleteSubnet, dispatch)
})

type SettingsProps = {
    settings: Settings,
    serviceInfo: ServiceInfoType,
    subnets: Subnets,
    hosts: Host,
    setSettings: (settings: Settings) => void,
    putSettings: (settings: Settings) => void,
    zabbixGroups: {loading: boolean, data: ZabbixGroup[], error: boolean},
    loadZabbixGroups: () => void,
    beginZabbixImport: (hostsManDir: number, zabbixGroup: string, merge: boolean) => void,
    setSnackbar: typeof setSnackbar

} & RouteComponentProps<{}> & WithTranslation & SubnetApi;

type SettingsState = {
    showChangeRootNode: boolean;
    showChangeNameTemplate: boolean;
    settings: Settings;
    hostsmanGroupId: number;
    zabbixGroupId: string;
    zabbixMergeEntries: boolean;
    subnetEditOpened: boolean;
    currentlyEditedSubnet: Subnet;
    isNewSubnet: boolean;
    
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
            showChangeNameTemplate: false,
            subnetEditOpened: false,
            isNewSubnet: false,
            currentlyEditedSubnet: {
                id: 0,
                name: '',
                address: '',
                mask: ''
            }
        }
        this.saveSettings = this.saveSettings.bind(this);
        this.handleRootHostChange = this.handleRootHostChange.bind(this);
        this.handleTargetHostsManDir = this.handleTargetHostsManDir.bind(this);
        this.handleTargetZabbixGroup = this.handleTargetZabbixGroup.bind(this);
        this.setClipboardAndToast = this.setClipboardAndToast.bind(this);
        this.handleSubnetForm = this.handleSubnetForm.bind(this);
    }

    componentDidMount() {
        this.props.loadZabbixGroups();
        this.props.fetchSubnets();
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

    setClipboardAndToast(text: string, t: (k: string) => string) {
        navigator.clipboard.writeText(text).then(
            () => this.props.setSnackbar({message: t("email_clipboard_write_success"), severity: "info"}),
            () => this.props.setSnackbar({message: t("email_clipboard_write_failed"), severity: "error"})
        )
    }

    handleSubnetForm(event: React.ChangeEvent<HTMLInputElement>) {
        const name = event.currentTarget.name;
        const value = event.currentTarget.value;
        this.setState({
            currentlyEditedSubnet: {
                ...this.state.currentlyEditedSubnet,
                [name]: value
            }
        });
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

                <ListSubheader>{t("settings_page_subnets_header")}</ListSubheader>
                {
                    this.props.subnets.data.map(subnet => (<ListItem>
                        <ListItemText primary={`${subnet.name} - ${subnet.address} ${subnet.mask}`}/>
                        <ListItemSecondaryAction>
                            <EditIcon onClick={() => this.setState({
                                subnetEditOpened: true,
                                currentlyEditedSubnet: subnet,
                                isNewSubnet: false
                            })} 
                            />
                        </ListItemSecondaryAction>
                    </ListItem>))
                }
                <ListItem button onClick={() => this.setState({
                        subnetEditOpened: true,
                        currentlyEditedSubnet: {
                            id: 0,
                            name: '',
                            address: '',
                            mask: ''
                        },
                        isNewSubnet: true
                    })}>
                    <ListItemText primary={t("settings_page_subnets_create_subnet")}/>
                </ListItem>

                <ListSubheader>{t("settings_page_service_info")}</ListSubheader>
                <ListItem button onClick={() => this.setClipboardAndToast(this.props.serviceInfo.data.info.adminEmail, t)}>
                    <ListItemText primary={`${t("settings_page_service_info_admin_email")}: ${this.props.serviceInfo.data.info.adminEmail}`}/>
                </ListItem>
                <ListItem>
                    <ListItemText primary={`${t("settings_page_service_info_location")}: ${this.props.serviceInfo.data.info.location}`} />
                </ListItem>
                <ListItem>
                    <ListItemText primary={`${t("settings_page_service_info_description")}: ${this.props.serviceInfo.data.info.description}`} />
                </ListItem>

                <ListSubheader>{t("settings_page_abilities")}</ListSubheader>
                <ListItem>
                    <ListItemText primary={`${t("settings_page_abilities_zabbix")}: ${this.props.serviceInfo.data.capabilities.zabbix}`} />
                </ListItem>
                <ListItem>
                    <ListItemText primary={`${t("settings_page_abilities_mapping")}: ${this.props.serviceInfo.data.capabilities.mapping}`} />
                </ListItem>
                <ListItem>
                    <ListItemText primary={`${t("settings_page_abilities_availability")}: ${this.props.serviceInfo.data.capabilities.serverSideAvailability}`} />
                </ListItem>

            </List>
            {/* <ChangeRootNodePopup open={this.state.showChangeRootNode} title={'Change root node'} body={''} onNo={() => {}} onYes={(value: string) => {}} /> */}
            <PopupField open={this.state.showChangeNameTemplate} title={'Change name template'} body={'Available placeholders: ...'} onNo={() => {}} onYes={(value: string) => {}} />

            <Dialog
            open={this.state.subnetEditOpened}
            onClose={() => this.setState({subnetEditOpened: false})}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">{"Edit subnet"}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    <form onSubmit={(e) => {e.preventDefault(); }} noValidate autoComplete="off">
                        <TextField style={{margin: '12px'}} label="Name" value={this.state.currentlyEditedSubnet.name} name="name"
                            onChange={this.handleSubnetForm}
                        />
                        <TextField style={{margin: '12px'}} label="Address" value={this.state.currentlyEditedSubnet.address} name="address"
                            onChange={this.handleSubnetForm}
                        />
                        <TextField style={{margin: '12px'}} label="Mask" value={this.state.currentlyEditedSubnet.mask} name="mask"
                            onChange={this.handleSubnetForm}
                        />
                    </form>
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => {
                    let formFields = {
                        id: this.state.currentlyEditedSubnet.id,
                        name: this.state.currentlyEditedSubnet.name,
                        address: this.state.currentlyEditedSubnet.address,
                        mask: this.state.currentlyEditedSubnet.mask
                    };

                    if (this.state.isNewSubnet) {
                        this.props.createSubnet(formFields);
                    } else {
                        this.props.saveSubnet(formFields);
                    }
                }} color="primary">
                    {this.state.isNewSubnet ? "Create subnet" : "Save subnet"}
                </Button>
                <Button onClick={() => this.setState({subnetEditOpened: false})} color="primary" autoFocus>
                    Cancel
                </Button>
                {
                    !this.state.isNewSubnet ? (
                        <Button onClick={() => this.props.deleteSubnet(this.state.currentlyEditedSubnet.id)} variant="outlined" color="secondary" autoFocus>
                            Delete
                        </Button>
                    ) : ''
                }
            </DialogActions>
        </Dialog>
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
