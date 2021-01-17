import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { fetchTree, saveObject } from '../../api/tree';
import { Host, HostFormData } from '../../models/host';
import { setBreadcrumb } from '../../state/actions/local';
import { AppState } from '../../state/reducers';
import { TreeState } from '../../state/reducers/hostsBrowser';
import { ProtocolState } from '../../state/reducers/protocols';
import { TagState } from '../../state/reducers/tags';
import { findExactHostById } from '../../util/tree';
import HostDirForm from './HostDirForm';
import HostForm from './HostForm';

type ParamTypes = {
    hostId: string;
}

export default (): any => {;
    let { hostId } = useParams<ParamTypes>();
    let dispatch = useDispatch();
    let history = useHistory();
    let tree = useSelector((state: {hostsBrowser: {tree: TreeState}}) => state.hostsBrowser.tree)
    let tags = useSelector((state: {tags: TagState}) => state.tags);
    let settings = useSelector((state: AppState) => state.local.settings);
    let protocols = useSelector((state: {protocols: ProtocolState}) => state.protocols);

    if (tree.loading || tree.error) {
        return (<p>Error somehow</p>)
    }

    let foundHost = findExactHostById(tree.tree, +hostId);

    if (! foundHost) {
        console.log(foundHost);
        return (<p>Host with {hostId} id not found</p>)
    }

    return foundHost.dir ? <HostDirForm 
        tags={tags.data}
        host={foundHost}
        onSubmit={(host: Host) => {
            dispatch(saveObject(host.id, {
                name: host.name, 
                address: host.address, 
                enabled: host.enabled, 
                dir: host.dir, 
                tags: host.tags.map(t => t.name),
                protocols: host.protocols
            }, () => {dispatch(fetchTree(settings.rootNode)); history.push(`/objects/info/${hostId}`);}));
        }}
        title={`Edit dir ${foundHost.name}`}/> : 
    <HostForm 
        tags={tags.data}
        protocols={protocols.data}
        host={foundHost}
        onSubmit={(host: Host) => {
            dispatch(saveObject(host.id, {
                name: host.name, 
                address: host.address, 
                enabled: host.enabled, 
                dir: host.dir, 
                tags: host.tags.map(t => t.name),
                protocols: host.protocols
            }, () => {dispatch(fetchTree(settings.rootNode)); history.push(`/objects/info/${hostId}`);}));
        }}
        title={`Edit host ${foundHost.name}`} />;
}