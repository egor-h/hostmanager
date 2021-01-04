import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { deleteTag, saveTag } from '../../api/tag';
import { Tag } from '../../models/host';
import { TagState } from '../../state/reducers/tags';
import TagForm from './TagForm';


export default () => {
    let history = useHistory();
    let { tagId } = useParams<{tagId: string}>();
    let dispatch = useDispatch();
    let tags = useSelector((tags: {tags: TagState}) => tags.tags);

    let foundTag = tags.data.filter(tag => tag.id == +tagId);
    if (foundTag.length == 0) {
        return (<p>Tag {tagId} not found</p>)
    }

    const onDeleteTag = (tagId: number) => {
        console.log(`call delete tag ${tagId}`);
        dispatch(deleteTag(tagId));
        history.push('/tags');
    }

    const onSubmitTag = (tag: Tag) => {
        dispatch(saveTag(tag));
        history.push('/tags');
    }

    return (<TagForm 
        title={`Edit tag: ${foundTag[0].name}`} 
        showDeleteButton={true} 
        tag={foundTag[0]} 
        onSubmit={onSubmitTag}
        onDelete={onDeleteTag}
        ></TagForm>)
}