import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { Host } from '../../models/host';
import { TreeState } from '../../state/reducers/hostsBrowser';
import { findExactHostById } from '../../util/tree';
import HostForm from './HostForm';

type ParamTypes = {
    hostId: string;
}

export default (): any => {;
    let { hostId } = useParams<ParamTypes>();
    let dispatch = useDispatch();

    let tree = useSelector((state: {hostsBrowser: {tree: TreeState}}) => state.hostsBrowser.tree)

    if (tree.loading || tree.error) {
        return (<p>Error somehow</p>)
    }

    let foundHost = findExactHostById(tree.tree, +hostId);
    
    if (! foundHost) {
        console.log(foundHost);
        return (<p>Host with {hostId} id not found</p>)
    }

    return <HostForm 
        host={foundHost}
        onSubmit={(host: Host) => {
            console.log(host);
        }}
        title={"EditHost"} />;
}