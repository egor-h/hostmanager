import React from 'react';
import { useParams } from 'react-router-dom';
import HostForm from './HostForm';

export default (props: any): any => {
    let hostId = props.hostId;
    return <HostForm id={hostId} />;
}