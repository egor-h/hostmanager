import { RecentHost } from '../../models/host';
import { HomePageModel } from '../../models/mainPage';

import {
    HOMEPAGE,
    HOMEPAGE_FAILED,
    HOMEPAGE_SUCCEEDED
} from '../constants';

export const homepage = () => ({
    type: HOMEPAGE
});

export const homepageFailed = () => ({
    type: HOMEPAGE_FAILED
});

export const homepageSucceeded = (recents: HomePageModel) => ({
    type: HOMEPAGE_SUCCEEDED,
    recents: recents
});