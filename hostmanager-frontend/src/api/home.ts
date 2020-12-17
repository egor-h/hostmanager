import { home } from '../state/actions';
import { getRequest } from './common';

const API_RECENTS = "http://192.168.0.9:8080/api/v1/recent/objects";

export const fetchRecents = () => {
    return getRequest({
        url: API_RECENTS,
        actionBeforeFetch: home.recentHosts,
        actionOnSuccess: home.recentHostsSucceeded,
        actionOnError: home.recentHostsFailed
    });
}