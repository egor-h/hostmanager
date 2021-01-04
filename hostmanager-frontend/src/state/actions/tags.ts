import { Tag } from '../../models/host';

import {
    TAGS, TAGS_FAILED, TAGS_SUCCEDED
} from '../constants';

export const tags = () => ({
    type: TAGS
});

export const homepageFailed = () => ({
    type: TAGS_FAILED
});

export const homepageSucceeded = (tags: Tag[]) => ({
    type: TAGS_SUCCEDED,
    data: tags
});
