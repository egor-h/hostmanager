import { Tag } from '../models/host';
import { tags } from '../state/actions';
import { setSnackbar } from '../state/actions/local';
import { doDelete, get, post, put } from './basicCrud';
import { BASE_URL, getRequest } from './common';

const API_TAGS = '/api/v1/tags';

export const fetchTags = () => get<Tag[]>({
    url: API_TAGS,
    actionBeforeFetch: tags.tags,
    actionOnSuccess: tags.homepageSucceeded,
    actionOnError: tags.homepageFailed
});

export const createTag = (name: string) => post<{name: string}>({
    url: API_TAGS,
    data: {name: name},
    onSuccess: (dispatch) => {
        dispatch(setSnackbar({severity: 'success', message: `Created tag ${name}`}));
        dispatch(fetchTags())
    },
    onError: (dispatch) => {}
});

export const saveTag = (tag: Tag) => put<Tag>({
    url: `${API_TAGS}/${tag.id}`,
    data: tag,
    onSuccess: (dispatch) => {
        dispatch(setSnackbar({severity: 'success', message: `Saved tag ${tag.name}`}));
        dispatch(fetchTags())
    },
    onError: (dispatch) => {}
});

export const deleteTag = (tagId: number) => doDelete({
    url: `${API_TAGS}/${tagId}`,
    onSuccess: (dispatch) => {
        dispatch(setSnackbar({severity: 'success', message: 'Deleted tag'}));
        dispatch(fetchTags())
    },
    onError: (dispatch) => {}
});