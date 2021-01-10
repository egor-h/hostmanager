import { Titlebar } from 'custom-electron-titlebar';
import {
    SET_EXPANDED,
    SET_SELECTED, SET_PROTOCOL_RESULT, SET_INTERVAL_ID, SET_BREADCRUMB, HIDE_SNACKBAR, SET_SNACKBAR
} from '../constants';
import { ProtocolResult, SnackbarData } from '../reducers/localState';


export const setExpanded = (expanded: string[]) => ({
    type: SET_EXPANDED,
    expanded: expanded
});

export const setSelected = (selected: string) => ({
    type: SET_SELECTED,
    selected: selected
});

export const setProtocolResult = (protocolResults: ProtocolResult[]) => ({
    type: SET_PROTOCOL_RESULT,
    protocolResults: protocolResults
})

export const setIntervalId = (intervalId: number) => ({
    type: SET_INTERVAL_ID,
    intervalId: intervalId
})

export const setBreadcrumb = (breadcrumb: {id: number, view: string}) => ({
    type: SET_BREADCRUMB,
    breadcrumb: breadcrumb
})

export const setSnackbar = (data: SnackbarData) => ({
    type: SET_SNACKBAR,
    data: data
})

export const hideSnackbar = () => ({
    type: HIDE_SNACKBAR
})