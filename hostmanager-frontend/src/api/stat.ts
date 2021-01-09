import { BASE_URL, getRequest } from './common';
import { stat } from '../state/actions'
import { get } from './basicCrud';
import { AllSubnetsStat } from '../models/stat';
const API_STAT = '/api/v1/stats/subnets'

export const statBySubnet1 = () => {
    return getRequest({
        url: `${API_STAT}/subnets`,
        actionBeforeFetch: stat.stat,
        actionOnSuccess: stat.statSucceeded,
        actionOnError: stat.statFailed
    });
}

export const statBySubnet = () => get<AllSubnetsStat>({
    url: API_STAT,
    actionBeforeFetch: stat.stat,
    actionOnSuccess: stat.statSucceeded,
    actionOnError: stat.statFailed
});