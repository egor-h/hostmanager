import { Host, HostFormData } from '../models/host';
import { hostsBrowser } from '../state/actions';
import { doDelete, get, post, put } from './basicCrud';

const API_TREE = '/api/v1/hosts';

export const fetchTree = () => get<Host>({
    url: `${API_TREE}/${33}`,
    actionBeforeFetch: hostsBrowser.hostsTree,
    actionOnSuccess: hostsBrowser.hostsTreeSucceeded,
    actionOnError: hostsBrowser.hostsTreeFailed
});

export const createObject = (parentId: number, hostData: HostFormData) => post({
    url: `${API_TREE}/${parentId}`,
    data: hostData,
    onSuccess: (dispatch) => dispatch(fetchTree()),
    onError: (dispatch) => {}
})

export const saveObject = (parentId: number, hostData: HostFormData) => put({
    url: `${API_TREE}/${parentId}`,
    data: hostData,
    onSuccess: (dispatch) => dispatch(fetchTree()),
    onError: (dispatch) => {}
})

export const deleteObject = (objectId: number) => doDelete({
    url: `${API_TREE}/${objectId}`,
    onSuccess: (dispatch) => dispatch(fetchTree()),
    onError: (dispatch) => {}
})