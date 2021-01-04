import { Tag } from '../models/host';
import { tags } from '../state/actions';
import { BASE_URL, getRequest } from './common';

const API_TAGS = `${BASE_URL}/api/v1/tags`;

export const fetchTags = () => {
    return getRequest({
        url: API_TAGS,
        actionBeforeFetch: tags.tags,
        actionOnSuccess: tags.homepageSucceeded,
        actionOnError: tags.homepageFailed
    });
}

export const createTag = (name: string) => {
    return (dispatch: any) => {
        fetch(API_TAGS, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: name })
        }).then(res => {
            console.log(res);
            dispatch(fetchTags());
        }).catch(error => console.error(error));
    }
}

export const saveTag = (tag: Tag) => {
    return (dispatch: any) => {
        fetch(`${API_TAGS}/${tag.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({name: tag.name})
        }).then(res => {
            console.log(res);
            dispatch(fetchTags());
        }).catch(error => console.error(error));
    }
}

export const deleteTag = (tagId: number) => {
    return (dispatch: any) => {
        fetch(`${API_TAGS}/${tagId}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' }
        }).then(res => {
            console.log(res);
            dispatch(fetchTags());
        }).catch(error => console.error(error));
    }
}