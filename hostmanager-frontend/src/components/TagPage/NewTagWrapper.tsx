import React from 'react';
import { WithTranslation, withTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { createTag } from '../../api/tag';
import { Tag } from '../../models/host';
import { TagState } from '../../state/reducers/tags';
import TagForm from './TagForm';


export default withTranslation()((props: WithTranslation) => {
    const { t } = props;
    let history = useHistory();
    let dispatch = useDispatch();
    let tags = useSelector((tags: {tags: TagState}) => tags.tags);

    const submitNewTag = (tag: Tag) => {
        console.log(tag)
        dispatch(createTag(tag.name))
        history.push('/tags')
    }

    return (<TagForm title={t("tags_page_add_new_tag_header")} showDeleteButton={false} tag={{id: -1, name: ''}} onSubmit={submitNewTag}></TagForm>)
});