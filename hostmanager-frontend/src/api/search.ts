import { BASE_URL, getRequest } from './common';
import { search, fullSearch } from '../state/actions'
import { get } from './basicCrud';
import { BriefHost, BriefSearchResult } from '../models/search';

const API_SEARCH = '/api/v1/search/brief';
const API_SEARCH_ALL_HOSTS = '/api/v1/search/hosts';

export const briefSearch = (query: string) => get<BriefSearchResult>({
    url: `${API_SEARCH}/${query}`,
    actionBeforeFetch: search.search,
    actionOnSuccess: search.searchSucceeded,
    actionOnError: search.searchFailed
})

export const fullHostSearch = (query: string, page: number) => get<BriefHost>({
    url: `${API_SEARCH_ALL_HOSTS}/${query}?page=${page}`,
    actionBeforeFetch: fullSearch.fullSearch,
    actionOnSuccess: fullSearch.fullSearchSucceeded,
    actionOnError: fullSearch.fullSearchFailed
})