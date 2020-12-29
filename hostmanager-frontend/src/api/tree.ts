import { getRequest } from './common';
import { hostsBrowser } from '../state/actions'

const API_TREE = "http://localhost:8080/api/v1/hosts/33";

export const fetchTree = () => {
    return getRequest({
        url: API_TREE,
        actionBeforeFetch: hostsBrowser.hostsTree,
        actionOnSuccess: hostsBrowser.hostsTreeSucceeded,
        actionOnError: hostsBrowser.hostsTreeFailed
    })
}
