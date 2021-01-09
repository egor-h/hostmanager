import { BASE_URL, getRequest } from './common';
import { stat } from '../state/actions'
const API_STAT = `${BASE_URL}/api/v1/stats`

export const statBySubnet = () => {
    return getRequest({
        url: `${API_STAT}/subnets`,
        actionBeforeFetch: stat.stat,
        actionOnSuccess: stat.statSucceeded,
        actionOnError: stat.statFailed
    });
}