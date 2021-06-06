import { BriefSearchResult } from '../../models/search';
import {
    FULL_SEARCH,
    FULL_SEARCH_CLEAR,
    FULL_SEARCH_FAILED,
    FULL_SEARCH_SUCCEDED
} from '../constants';
import { SearchData } from '../reducers/fullSearch';


export const fullSearch = () => ({
    type: FULL_SEARCH
});

export const fullSearchFailed = () => ({
    type: FULL_SEARCH_FAILED
});

export const fullSearchSucceeded = (data: SearchData) => ({
    type: FULL_SEARCH_SUCCEDED,
    data: data
});

export const fullSearchClear = () => ({
    type: FULL_SEARCH_CLEAR
})