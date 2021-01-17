import { Titlebar } from 'custom-electron-titlebar';
import { Settings } from '../../models/settings';
import {
    SET_EXPANDED,
    SET_SELECTED, SET_PROTOCOL_RESULTS, SET_INTERVAL_ID, SET_BREADCRUMB, HIDE_SNACKBAR, SET_SNACKBAR, SETTINGS, SET_ALL_PROTOCOL_RESULTS, SET_ONE_PROTOCOL_RESULT
} from '../constants';
import { ProtocolResult, ProtocolResultMapByHostId, SnackbarData } from '../reducers/localState';


export const setExpanded = (expanded: string[]) => ({
    type: SET_EXPANDED,
    expanded: expanded
});

export const setSelected = (selected: string) => ({
    type: SET_SELECTED,
    selected: selected
});

export const setOneProtocolResult = (protocolResult: ProtocolResult) => ({
    type: SET_ONE_PROTOCOL_RESULT,
    protocolResult: protocolResult
})

export const setProtocolResult = (protocolResults: ProtocolResult[]) => ({
    type: SET_PROTOCOL_RESULTS,
    protocolResults: protocolResults
})

export const setAllProtocolResults = (results: ProtocolResultMapByHostId) => ({
    type: SET_ALL_PROTOCOL_RESULTS,
    results: results
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

export const settings = (settings: Settings) => ({
    type: SETTINGS,
    settings: settings
})