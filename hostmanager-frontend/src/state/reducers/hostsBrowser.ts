import { Host } from "../../models/host";
import { HOST_TREE, HOST_TREE_FAILED, HOST_TREE_SUCCEDED, HOST_TABLE, HOST_TABLE_FAILED, HOST_TABLE_SUCCEDED } from "../constants";


export type TreeState = {
    loading: boolean;
    tree: Host;
    error: boolean;
}

export type TableState = {
    loading: boolean;
    table: Host[];
    error: boolean;
}

const defaultHost: Host = { id: 0, name: '', address: '', dir: false, chld: [] }

const initialState = {
    tree: {
        loading: false,
        tree: defaultHost,
        error: false
    },
    table: {
        loading: false,
        table: [],
        error: false
    }
}

export const hostsBrowser = (state = initialState, action: any) => {
    switch (action.type) {
        case HOST_TREE:
            return {
                ...state,
                tree: {
                    loading: true,
                    tree: defaultHost,
                    error: false
                }
            }
        case HOST_TREE_SUCCEDED:
            return {
                ...state,
                tree: {
                    loading: false,
                    tree: action.tree,
                    error: false
                }
            }
        case HOST_TREE_FAILED:
            return {
                ...state,
                tree: {
                    loading: false,
                    tree: defaultHost,
                    error: true
                }
            }
        case HOST_TABLE:
            return {
                ...state,
                loading: true,
                table: [],
                error: false
            }
        case HOST_TABLE_SUCCEDED:
            return {
                ...state,
                loading: true,
                table: action.hosts,
                error: false
            }
        case HOST_TABLE_FAILED:
            return {
                ...state,
                loading: true,
                table: [],
                error: false
            }
        default:
            return state;
    }
}