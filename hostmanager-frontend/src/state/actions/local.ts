import { Titlebar } from 'custom-electron-titlebar';
import {
    SET_EXPANDED,
    SET_SELECTED, SET_PROTOCOL_RESULT
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

export const setProtocolResult = (protocolResult: null | ProtocolResult) => ({
    type: SET_PROTOCOL_RESULT,
    protocolResult: protocolResult
})