import React from 'react';
import { WithTranslation, withTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { createProto } from '../../api/protocol';
import { Protocol } from '../../models/host';
import { TagState } from '../../state/reducers/tags';
import ProtocolForm from './ProtocolForm';


export default withTranslation()((props: WithTranslation) => {
    const { t } = props;
    let history = useHistory();
    let dispatch = useDispatch();
    let tags = useSelector((tags: {tags: TagState}) => tags.tags);

    const submitNewProtocol = (protocol: Protocol) => {
        console.log(protocol);
        dispatch(createProto(protocol));
        history.push('/protocols');
    }

    return (<ProtocolForm title={t("protocols_page_add_new_protocol_header")} 
                showDeleteButton={false} 
                protocol={{id: -1, name: '', executionLine: '', launchType: 'JUST_RUN'}} 
                onSubmit={submitNewProtocol}
            ></ProtocolForm>)
});