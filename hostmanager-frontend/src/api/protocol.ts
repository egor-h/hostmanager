import { Protocol, Tag } from '../models/host';
import { protocols } from '../state/actions';
import { BASE_URL, getRequest } from './common';

const API_PROTOS = `${BASE_URL}/api/v1/protocols`;

export const fetchProtos = () => {
    return getRequest({
        url: API_PROTOS,
        actionBeforeFetch: protocols.protocols,
        actionOnSuccess: protocols.protocolsSucceded,
        actionOnError: protocols.protocolsFailed
    });
}

export const createProto = (protocol: Omit<Protocol, "id">) => {
    return (dispatch: any) => {
        fetch(API_PROTOS, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(protocol)
        }).then(res => {
            console.log(res);
            dispatch(fetchProtos());
        }).catch(error => console.error(error));
    }
}

export const saveProto = (protoId: number, protocol: Omit<Protocol, "id">) => {
    return (dispatch: any) => {
        fetch(`${API_PROTOS}/${protoId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(protocol)
        }).then(res => {
            console.log(res);
            dispatch(fetchProtos());
        }).catch(error => console.error(error));
    }
}

export const deleteProto = (protocolId: number) => {
    return (dispatch: any) => {
        fetch(`${API_PROTOS}/${protocolId}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' }
        }).then(res => {
            console.log(res);
            dispatch(fetchProtos());
        }).catch(error => console.error(error));
    }
}