import { SET_TITLEBAR, SET_EXPANDED } from "../constants"

const initialState = {
    titlebar: undefined,
    treeExpanded: []
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
        default:
            return state;
    }
}