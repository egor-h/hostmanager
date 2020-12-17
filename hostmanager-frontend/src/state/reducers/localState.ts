import { SET_TITLEBAR, SET_EXPANDED, SET_SELECTED } from "../constants"

export type LocalState = {
    titlebar: undefined;
    expanded: string[];
    selected: string;
}

const initialState = {
    titlebar: undefined,
    expanded: [],
    selected: "0"
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
        default:
            return state;
    }
}