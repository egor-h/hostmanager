import { Host } from "../../models/host"
import { SET_EXPANDED, SET_SELECTED, SET_PROTOCOL_RESULT } from "../constants"

export type ProtocolResult = {
    host: Host;
    stdout: string;
    stderr: string;
    exitCode: number;
}

export type LocalState = {
    expanded: string[];
    selected: string;
    protocolResult: null | ProtocolResult;
}

const initialState = {
    expanded: [],
    selected: "0",
    protocolResult: null
}

export const local = (state = initialState, action: any) => {
    switch (action.type) {
        case SET_EXPANDED:
            return {
                ...state,
                expanded: action.expanded
            }
        case SET_SELECTED:
            return {
                ...state,
                selected: action.selected
            }
        case SET_PROTOCOL_RESULT:
            return {
                ...state,
                protocolResult: action.protocolResult
            }
        default:
            return state;
    }
}