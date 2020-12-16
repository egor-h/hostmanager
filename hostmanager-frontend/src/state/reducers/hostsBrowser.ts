import { Host } from "../../models/host";
import { HOST_TREE, HOST_TREE_FAILED, HOST_TREE_SUCCEDED } from "../constants";


export type TreeState = {
    loading: boolean;
    tree: Host;
    error: boolean;
}

const defaultHost: Host = {id: 0, name: '', address: '', dir: false, chld: []}

const initialState = {
    tree: {
        loading: false,
        tree: defaultHost,
        error: false
    }
}

export const hostsBrowser = (state = initialState, action: any) => {
    switch(action.type) {
        case HOST_TREE:
            return {
                tree: {
                    loading: true,
                    tree: defaultHost,
                    error: false
                }
            }
        case HOST_TREE_SUCCEDED:
            return {
                tree: {
                    loading: false,
                    tree: action.tree,
                    error: false
                }
            }
        case HOST_TREE_FAILED:
            return {
                tree: {
                    loading: false,
                    tree: defaultHost,
                    error: true
                }
            }
        default:
            return state;
    }
}