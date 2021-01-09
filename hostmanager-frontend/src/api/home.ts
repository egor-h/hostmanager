import { home } from '../state/actions';
import { BASE_URL, getRequest } from './common';

const API_RECENTS = `${BASE_URL}/api/v1/welcome`;

export const fetchRecents = () => {
    return getRequest({
        url: API_RECENTS,
        actionBeforeFetch: home.homepage,
        actionOnSuccess: home.homepageSucceeded,
        actionOnError: home.homepageFailed
    });
}