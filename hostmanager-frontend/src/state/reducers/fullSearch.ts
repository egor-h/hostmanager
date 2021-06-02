import { BriefSearchResult, BriefHost } from "../../models/search";
import { SEARCH, SEARCH_FAILED, SEARCH_SUCCEDED } from "../constants";

const EMPTY_SEARCH = {
    page: 0,
    hosts: []
}

const initialState: SearchState = {
    loading: false,
    data: EMPTY_SEARCH,
    error: false
}

export type SearchData = {
    page: number,
    hosts: BriefHost[]
}

export type FullSearchState = {
    loading: boolean;
    data: SearchData;
    error: boolean;
}

export const fullSearch = (state = initialState, action: any) => {
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