import { Host, Protocol } from "../../models/host"
import { SET_EXPANDED, SET_SELECTED, SET_PROTOCOL_RESULT, SET_INTERVAL_ID, SET_BREADCRUMB } from "../constants"

export type ProtocolResult = {
    hostId: number;
    createdAt: number; // unix timestamp
    protocol: Protocol;
    stdout: string;
    stderr: string;
    exitCode: number;
}

export type LocalState = {
    expanded: string[];
    selected: string;
    intervalId: number;
    protocolResults: ProtocolResult[];
    breadcrumb: {id: number, view: "info" | "edit" | "table"}
}

const initialState = {
    expanded: [],
    selected: "0",
    intervalId: 0,
    protocolResults: [],
    breadcrumb: {id: 0, view: "table"}
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
                protocolResults: action.protocolResults
            }
        case SET_INTERVAL_ID:
            return {
                ...state,
                intervalId: action.intervalId
            }
        case SET_BREADCRUMB:
            return {
                ...state,
                breadcrumb: action.breadcrumb
            }
        default:
            return state;
    }
}