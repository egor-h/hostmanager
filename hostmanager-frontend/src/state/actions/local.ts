import { Titlebar } from 'custom-electron-titlebar';
import {
    SET_EXPANDED,
    SET_SELECTED, SET_PROTOCOL_RESULT, SET_INTERVAL_ID, SET_BREADCRUMB
} from '../constants';
import { ProtocolResult } from '../reducers/localState';


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