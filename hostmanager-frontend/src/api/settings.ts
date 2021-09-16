import { Settings } from "../models/settings";
import { setSnackbar, zabbixGroupFailed, zabbixGroups, zabbixGroupsSucceded } from "../state/actions/local";
import api from "./base"

const API_SETTINGS = '/api/v1/settings';
const ZABBIX_GROUPS = '/api/v1/zabbix';

export const getUserSettings = () => {}

export const putUserSettings = (settings: Settings) => {
    return (dispatch: any) => {
        api.put(API_SETTINGS, settings)
        .then(res => {
            dispatch(setSnackbar({severity: 'success', message: 'Settings saved!'}));
        })
        .catch(error => {
            console.error(error);
        });
    }
}

export const getZabbixGroups = () => {
    return (dispatch: any) => {
        dispatch(zabbixGroups())
        api.get(ZABBIX_GROUPS)
        .then(res => dispatch(zabbixGroupsSucceded(res.data)))
        .catch(error => {
            console.error(error);
            dispatch(zabbixGroupFailed());
        });
    }
}

export const syncDirToZabbix = (hostsManDir: number, zabbixGroup: string, merge: boolean) => {
    return (dispatch: any) => {
        let params = {}
        if (merge) {
            params = {merge: merge}
        }
        api.get(`/api/v1/zabbix/${hostsManDir}/to/${zabbixGroup}`, {params})
        .then(res => dispatch(setSnackbar({severity: 'success', message: 'Zabbix sync begin'})))
        .catch(error => {   
            console.log(error);
            dispatch(setSnackbar({severity: 'error', message: 'Error while zabbix group sync'}));
        });
    }
}


export const searchEngineIndex = () => {
    return (dispatch: any) => {
        
        api.get("/api/v1/search/indexAllData")
        .then(res => dispatch(setSnackbar({severity: 'success', message: 'Data indexing started..'})))
        .catch(error => {   
            console.log(error);
            dispatch(setSnackbar({severity: 'error', message: 'Error while syncing data'}));
        });
    }
}