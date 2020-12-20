import React from "react";
import { useParams } from 'react-router-dom';
import HostForm from './HostForm';

type ParamTypes = {
    parentId: string;
}


export default (): any => {
    let { parentId } = useParams<ParamTypes>();
    return <HostForm id={parentId} />;
}