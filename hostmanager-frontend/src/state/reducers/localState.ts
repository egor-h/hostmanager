import { Host, Protocol } from "../../models/host"
import { DEFAULT_SETTINGS, Settings, ZabbixGroup } from "../../models/settings";
import { SET_EXPANDED, SET_SELECTED, SET_INTERVAL_ID, SET_BREADCRUMB, HIDE_SNACKBAR, SET_SNACKBAR, SETTINGS, SET_ALL_PROTOCOL_RESULTS, SET_PROTOCOL_RESULTS, SET_ONE_PROTOCOL_RESULT, ZABBIX_GROUPS, ZABBIX_GROUPS_FAILED, ZABBIX_GROUPS_SUCCEDED } from "../constants"

export type SnackbarSeverity = "error" | "warning" | "info" | "success";
export type SnackbarData = {
    severity: SnackbarSeverity;
    message: string
}

export type ProtocolResult = {
    hostId: number;
    createdAt: number; // unix timestamp
    protocol: Protocol;
    stdout: string;
    stderr: string;
    exitCode: number;
}

export interface ProtocolResultMapByProtocolType {
    [protocolType: string]: ProtocolResult;
}

export interface ProtocolResultMapByHostId {
    [hostId: number]: ProtocolResultMapByProtocolType;
}

export type LocalState = {
    expanded: string[];
    selected: string;
    intervalId: number;
    // protocolResults: ProtocolResult[];
    protocolResults: ProtocolResultMapByHostId;
    breadcrumb: {id: number, view: "info" | "edit" | "table"}
    snackbar: {
        show: boolean,
        data: SnackbarData
    },
    settings: Settings;
    zabbixGroups: {
        loading: boolean,
        data: ZabbixGroup[],
        error: false
    };
}

const initialState = {
    expanded: [],
    selected: "0",
    intervalId: 0,
    protocolResults: {},
    breadcrumb: {id: 0, view: "table"},
    snackbar: {
        show: false,
        data: {
            severity: "info",
            message: ""
        }
    },
    settings: DEFAULT_SETTINGS,
    zabbixGroups: {
        loading: false,
        data: [],
        error: false
    }
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
        case SET_ONE_PROTOCOL_RESULT:
            return {
                ...state,
                protocolResults: state.protocolResults[action.protocolResult.hostId] !== undefined
                ? (() => {
                    let copied = {...state.protocolResults, };
                    let resultsForHost = copied[action.protocolResult.hostId];
                    resultsForHost[action.protocolResult.protocol.launchType] = action.protocolResult;
                    return copied;
                })()
                : {...state.protocolResults, ...{[action.protocolResult.hostId]: {[action.protocolResult.protocol.launchType]: action.protocolResult}} }
            }
        case SET_PROTOCOL_RESULTS:
            return {
                ...state,
                // protocolResults: state.protocolResults.includes(1)
            }
        case SET_ALL_PROTOCOL_RESULTS:
            return {
                ...state,
                protocolResults: action.results
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
        case SET_SNACKBAR:
            return {
                ...state,
                snackbar: {
                    show: true,
                    data: action.data
                }
            }
        case HIDE_SNACKBAR:
            return {
                ...state,
                snackbar: {
                    show: false,
                    data: state.snackbar.data
                }
            }
        case SETTINGS:
            return {
                ...state,
                settings: action.settings
            }
        case ZABBIX_GROUPS:
            return {
                ...state,
                zabbixGroups: {
                    loading: true,
                    data: [],
                    error: false
                }
            }
        case ZABBIX_GROUPS_FAILED: 
            return {
                ...state,
                zabbixGroups: {
                    loading: false,
                    data: [],
                    error: true
                }
            }
        case ZABBIX_GROUPS_SUCCEDED:
            return {
                ...state,
                zabbixGroups: {
                    loading: false,
                    data: action.groups,
                    error: false
                }
            }
        default:
            return state;
    }
}