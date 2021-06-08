import React from 'react';
import { WithTranslation, withTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { deleteProto, saveProto } from '../../api/protocol';
import { Protocol } from '../../models/host';
import { ProtocolState } from '../../state/reducers/protocols';
import ProtocolForm from './ProtocolForm';


export default withTranslation()((props: WithTranslation) => {
    const { t } = props;
    let history = useHistory();
    let { protocolId } = useParams<{protocolId: string}>();
    let dispatch = useDispatch();
    let protocols = useSelector((protocols: {protocols: ProtocolState}) => protocols.protocols);

    let foundProto = protocols.data.filter(proto => proto.id == +protocolId);
    console.log("editwrapper:")
    console.log(protocols);
    if (foundProto.length == 0) {
        return (<p>{t("protocols_page_protocol_not_found", {protocolId})}</p>)
    }

    const onDeleteTag = (protocolId: number) => {
        console.log(`call delete proto ${protocolId}`);
        dispatch(deleteProto(protocolId));
        history.push('/protocols');
    }

    const onSubmitTag = (protocol: Protocol) => {
        dispatch(saveProto(+protocolId, protocol));
        history.push('/protocols');
    }

    return (<ProtocolForm 
        title={t("protocols_page_edit_protocol_header", {protocolName: foundProto[0].name})} 
        showDeleteButton={true} 
        protocol={foundProto[0]} 
        onSubmit={onSubmitTag}
        onDelete={onDeleteTag}
        ></ProtocolForm>)
});