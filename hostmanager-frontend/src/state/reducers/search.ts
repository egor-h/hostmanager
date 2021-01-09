import { BriefSearchResult } from "../../models/search";
import { SEARCH, SEARCH_FAILED, SEARCH_SUCCEDED } from "../constants";

const EMPTY_SEARCH = {
    hosts: [],
    notes: [],
    protocols: [],
    tags: []
}

const initialState: SearchState = {
    loading: false,
    data: EMPTY_SEARCH,
    error: false
}

export type SearchState = {
    loading: boolean;
    data: BriefSearchResult;
    error: boolean;
}

export const search = (state = initialState, action: any) => {
    switch(action.type) {
        case SEARCH:
            return {
                loading: true,
                data: EMPTY_SEARCH,
                error: false
            }
        case SEARCH_SUCCEDED:
            return {
                loading: false,
                data: action.data,
                error: false
            }
        case SEARCH_FAILED:
            return {
                loading: false,
                data: EMPTY_SEARCH,
                error: true
            }
        default:
            return state;
    }
}