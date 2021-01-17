import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { deleteObject, fetchTree } from '../../api/tree';
import { Host } from '../../models/host';
import { setSelected } from '../../state/actions/local';
import { AppState } from '../../state/reducers';
import { findHostById } from '../../util/tree';
import HostTable from './HostTable';
import LoadingHostTableSkeleton from './LoadingHostTableSkeleton';

type ParamTypes = {
    parentId: string;
}

type PropType = {
    wholeTree: Host;
    selectedDir: string;
}

export default (props: PropType): any => {
    let history = useHistory();
    let dispatch = useDispatch()
    let { parentId } = useParams<ParamTypes>();
    let settings = useSelector((state: AppState) => state.local.settings) 
    let tree = useSelector((state: AppState) => state.hostsBrowser.tree);

    const onRowClicked = (row: Host): void => {
        if (row.dir) {
            dispatch(setSelected(row.id+''));
            history.push(`/objects/table/${row.id}`);
        } else {
            history.push(`/objects/info/${row.id}`);
        }
    }
    
    if (tree.loading) {
        return (<LoadingHostTableSkeleton />);
    }

    let hosts = findHostById(tree.tree, +parentId);

    return (<HostTable
        tableTitle={"Hosts"}
        parentId={+parentId}
        onRowClicked={onRowClicked}
        onEntryDelete={(row) => {
            dispatch(deleteObject(row.id, () => {dispatch(fetchTree(settings.rootNode))}));
        }}
        data={(hosts && hosts.dir) ? hosts.chld : []} />);
}
