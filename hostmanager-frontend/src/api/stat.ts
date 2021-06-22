import { BASE_URL, getRequest } from './common';
import { stat, subnetStat } from '../state/actions'
import { get } from './basicCrud';
import { AllSubnetsStat, NetworkToInterval } from '../models/stat';
const API_STAT = '/api/v1/stats/subnets'
const API_STAT_INTERVALS = '/api/v1/stats/subnets/spaces'

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

export const subnetIntervals = () => get<NetworkToInterval>({
    url: API_STAT_INTERVALS,
    actionBeforeFetch: subnetStat.subnetStats,
    actionOnSuccess: subnetStat.subnetStatsSucceded,
    actionOnError: subnetStat.subnetStatsFailed
});