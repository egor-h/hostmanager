import { BASE_URL, getRequest } from './common';
import { search } from '../state/actions'
import { get } from './basicCrud';
import { BriefSearchResult } from '../models/search';

const API_TAGS = '/api/v1/search/brief';

export const briefSearch = (query: string) => get<BriefSearchResult>({
    url: `${API_TAGS}/${query}`,
    actionBeforeFetch: search.search,
    actionOnSuccess: search.searchSucceeded,
    actionOnError: search.searchFailed
})