import { RecentHost } from '../../models/host';

import {
    RECENTS,
    RECENTS_FAILED,
    RECENTS_SUCCEEDED
} from '../constants';

export const recentHosts = () => ({
    type: RECENTS
});

export const recentHostsFailed = () => ({
    type: RECENTS_FAILED
});

export const recentHostsSucceeded = (recents: RecentHost[]) => ({
    type: RECENTS_SUCCEEDED,
    recents: recents
});