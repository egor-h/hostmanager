import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { createTag } from '../../api/tag';
import { Tag } from '../../models/host';
import { TagState } from '../../state/reducers/tags';
import TagForm from './TagForm';


export default () => {
    let history = useHistory();
    let dispatch = useDispatch();
    let tags = useSelector((tags: {tags: TagState}) => tags.tags);

    const submitNewTag = (tag: Tag) => {
        console.log(tag)
        dispatch(createTag(tag.name))
        history.push('/tags')
    }

    return (<TagForm title="New tag" showDeleteButton={false} tag={{id: -1, name: ''}} onSubmit={submitNewTag}></TagForm>)
}