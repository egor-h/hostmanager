import { Protocol } from '../models/host';
import { protocols } from '../state/actions';
import { setSnackbar } from '../state/actions/local';
import { doDelete, get, post, put } from './basicCrud';

const API_PROTOS = '/api/v1/protocols';

export const fetchProtos = () => get<Protocol[]>({
    url: API_PROTOS,
    actionBeforeFetch: protocols.protocols,
    actionOnSuccess: protocols.protocolsSucceded,
    actionOnError: protocols.protocolsFailed
});

export const createProto = (protocol: Omit<Protocol, "id">) => post<Omit<Protocol, "id">>({
    url: API_PROTOS,
    data: protocol,
    onSuccess: (dispatch) => {
        dispatch(setSnackbar({severity: 'success', message: `Created protocol ${protocol.name}`}));
        dispatch(fetchProtos())
    },
    onError: (dispatch) => {}
});

export const saveProto = (protoId: number, protocol: Omit<Protocol, "id">) => put<Omit<Protocol, "id">>({
    url: `${API_PROTOS}/${protoId}`,
    data: protocol,
    onSuccess: (dispatch) => {
        dispatch(setSnackbar({severity: 'success', message: `Saved protocol ${protocol.name}`}));
        dispatch(fetchProtos())
    },
    onError: (dispatch) => {}
});

export const deleteProto = (protocolId: number) => doDelete({
    url: `${API_PROTOS}/${protocolId}`,
    onSuccess: (dispatch) => {
        dispatch(setSnackbar({severity: 'success', message: 'Deleted protocol'}));
        dispatch(fetchProtos());
    },
    onError: (dispatch) => {}
});
