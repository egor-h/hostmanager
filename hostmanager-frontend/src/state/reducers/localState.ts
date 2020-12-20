import { SET_TITLEBAR, SET_EXPANDED, SET_SELECTED, SET_BROWSER_MODE } from "../constants"

export type LocalState = {
    titlebar: undefined;
    expanded: string[];
    selected: string;
    browserMode: string;
}

const initialState = {
    titlebar: undefined,
    expanded: [],
    selected: "0",
    browserMode: "table"
}

export const local = (state = initialState, action: any) => {
    switch (action.type) {
        case SET_TITLEBAR:
            return {
                ...state,
                titlebar: action.titlebar
            }

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
        case SET_BROWSER_MODE:
            return {
                ...state,
                browserMode: action.mode
            }
        default:
            return state;
    }
}