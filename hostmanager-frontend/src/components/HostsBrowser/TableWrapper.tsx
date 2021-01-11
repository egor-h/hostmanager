import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams, useRouteMatch } from 'react-router-dom';
import { deleteObject, fetchTree } from '../../api/tree';
import { Host } from '../../models/host';
import { setSelected } from '../../state/actions/local';
import { AppState } from '../../state/reducers';
import { findHostById } from '../../util/tree';
import HostTable from './HostTable';

type ParamTypes = {
    parentId: string;
}

type PropType = {
    wholeTree: Host;
    selectedDir: string;
}

export default (props: PropType): any => {
    let match = useRouteMatch();
    let history = useHistory();
    let settings = useSelector((state: AppState) => state.local.settings) 
    
    let { parentId } = useParams<ParamTypes>();
    let dispatch = useDispatch();
    const onRowClicked = (row: Host): void => {
        if (row.dir) {
            dispatch(setSelected(row.id+''));
            history.push(`/objects/table/${row.id}`);
        } else {
            history.push(`/objects/info/${row.id}`);
        }
        
    }
    let hosts = findHostById(props.wholeTree, +parentId);

    return (
    <HostTable
        tableTitle={"Hosts"}
        parentId={+parentId}
        onRowClicked={onRowClicked}
        onEntryDelete={(row) => {
            dispatch(deleteObject(row.id));
            dispatch(fetchTree(settings.rootNode))
        }}
        data={(hosts && hosts.dir) ? hosts.chld : []} />);
}
