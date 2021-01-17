import { Host, HostFormData } from '../models/host';
import { hostsBrowser } from '../state/actions';
import { setSnackbar } from '../state/actions/local';
import { doDelete, get, post, put } from './basicCrud';

const API_TREE = '/api/v1/hosts';

export const fetchTree = (rootNode: number) => get<Host>({
    url: `${API_TREE}/${rootNode}`,
    actionBeforeFetch: hostsBrowser.hostsTree,
    actionOnSuccess: hostsBrowser.hostsTreeSucceeded,
    actionOnError: hostsBrowser.hostsTreeFailed
});

export const createObject = (parentId: number, hostData: HostFormData, onSuccess?: () => void) => post({
    url: `${API_TREE}/${parentId}`,
    data: hostData,
    onSuccess: (dispatch) => {
        if (onSuccess) {
            onSuccess();
        }
        dispatch(setSnackbar({severity: 'success', message: `Created ${hostData.dir ? 'directory' : 'host'} ${hostData.name}`}));
    },
    onError: (dispatch) => {}
})

export const saveObject = (parentId: number, hostData: HostFormData, onSuccess?: () => void) => put({
    url: `${API_TREE}/${parentId}`,
    data: hostData,
    onSuccess: (dispatch) => {
        if (onSuccess) {
            onSuccess();
        }
        dispatch(setSnackbar({severity: 'success', message: `Saved ${hostData.dir ? 'directory' : 'host'} ${hostData.name}`}));
    },
    onError: (dispatch) => {}
})

export const deleteObject = (objectId: number, onSuccess?: () => void) => doDelete({
    url: `${API_TREE}/${objectId}`,
    onSuccess: (dispatch) => {
        if (onSuccess) {
            onSuccess();
        }
        dispatch(setSnackbar({severity: 'success', message: 'Deleted host'}));
    },
    onError: (dispatch) => {}
})