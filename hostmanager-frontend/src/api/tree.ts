import { getRequest, BASE_URL } from './common';
import { hostsBrowser } from '../state/actions'
import { HostFormData } from '../models/host';

const API_TREE = `${BASE_URL}/api/v1/hosts`;

export const fetchTree = () => {
    const root = 33;
    return getRequest({
        url: `${API_TREE}/${root}`,
        actionBeforeFetch: hostsBrowser.hostsTree,
        actionOnSuccess: hostsBrowser.hostsTreeSucceeded,
        actionOnError: hostsBrowser.hostsTreeFailed
    })
}

export const createObject = (parentId: number, hostData: HostFormData) => {
    return (dispatch: any) => {
        fetch(`${API_TREE}/${parentId}`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ ...hostData })
        }).then(res => {
            console.log(res);
            dispatch(fetchTree())
        }).catch(error => console.error(error));
    }
}

export const saveObject = (objectId: number, hostData: HostFormData) => {
    return (dispatch: any) => {
        fetch(`${API_TREE}/${objectId}`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(hostData)
        }).then(res => {
            console.log(res);
            dispatch(fetchTree())
        }).catch(error => console.error(error));
    }
}

export const deleteObject = (objectId: number) => {
    return (dispatch: any) => {
        fetch(`${API_TREE}/${objectId}`, {
            method: 'DELETE'
        }).then(res => {
            console.log(res);
            dispatch(fetchTree())
        }).catch(error => console.error(error));
    }
}