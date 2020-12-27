import React from 'react';
import { Host } from '../../models/host';
import HostForm from './HostForm';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams, useRouteMatch } from 'react-router-dom';

type ParamTypes = {
    parentId: string;
}

type PropType = {
    wholeTree: Host;
    selectedDir: string;
}

export default (props: any): any => {
    let history = useHistory();
    let { parentId } = useParams<ParamTypes>();
    let dispatch = useDispatch();

    let hostId = props.hostId;
    return <HostForm hostState={{
        name: {
            value: '',
            onChange: ((e: any) => {})
        },
        address: {
            value: '',
            onChange: ((e: any) => {})
        }
    }} title={"EditHost"} id={hostId} />;
}