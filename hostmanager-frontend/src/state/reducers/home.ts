import { RECENTS, RECENTS_FAILED, RECENTS_SUCCEEDED } from "../constants";

const initialState = {
    recents: {
        loading: false,
        data: [],
        error: false
    }
};

export const home = (state = initialState, action: any) => {
    switch (action.type) {
        case RECENTS: 
            return {
                ...state,
                recents: {
                    loading: true,
                    data: [],
                    error: false
                }
            }
        case RECENTS_SUCCEEDED:
            return {
                ...state,
                recents: {
                    loading: false,
                    data: action.recents,
                    error: false
                }
            };
        case RECENTS_FAILED:
            return {
                ...state,
                recents: {
                    loading: false,
                    data: [],
                    error: true
                }
            }
        default:
            return state;
    }
};
