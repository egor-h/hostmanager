import { BriefSearchResult, BriefHost, FullSearchResult } from "../../models/search";
import { FULL_SEARCH, FULL_SEARCH_CLEAR, FULL_SEARCH_FAILED, FULL_SEARCH_SUCCEDED } from "../constants";

const EMPTY_SEARCH: SearchData = {
    page: 0,
    hosts: []
}

const initialState: FullSearchState = {
    loading: false,
    data: EMPTY_SEARCH,
    error: false
}

export type SearchData = FullSearchResult

export type FullSearchState = {
    loading: boolean;
    data: SearchData;
    error: boolean;
}

export const fullSearch = (state = initialState, action: any) => {
    switch(action.type) {
        case FULL_SEARCH:
            return {
                loading: true,
                data: state.data,
                error: false
            }
        case FULL_SEARCH_SUCCEDED:
            return {
                loading: false,
                data: {
                    page: action.data.page,
                    hosts: [...state.data.hosts, ...action.data.hosts]
                },
                error: false
            }
        case FULL_SEARCH_CLEAR:
            return {
                loading: false,
                data: {
                    page: 0,
                    hosts: []
                },
                error: false
            }
        case FULL_SEARCH_FAILED:
            return {
                loading: false,
                data: EMPTY_SEARCH,
                error: true
            }
        default:
            return state;
    }
}