import { BriefSearchResult } from '../../models/search';
import {
    SEARCH,
    SEARCH_FAILED,
    SEARCH_SUCCEDED
} from '../constants';


export const search = () => ({
    type: SEARCH
});

export const searchFailed = () => ({
    type: SEARCH_FAILED
});

export const searchSucceeded = (data: BriefSearchResult) => ({
    type: SEARCH_SUCCEDED,
    data: data
});
