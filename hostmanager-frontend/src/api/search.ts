import { BASE_URL, getRequest } from './common';
import { search } from '../state/actions'
const API_TAGS = `${BASE_URL}/api/v1/search`;

export const briefSearch = (query: string) => {
    return getRequest({
        url: `${API_TAGS}/brief/${query}`,
        actionBeforeFetch: search.search,
        actionOnSuccess: search.searchSucceeded,
        actionOnError: search.searchFailed
    });
}