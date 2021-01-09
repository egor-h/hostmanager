import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useParams, useRouteMatch } from 'react-router-dom';
import { deleteObject } from '../../api/tree';
import { Host } from '../../models/host';
import { setSelected } from '../../state/actions/local';
import { findByTag } from '../../util/tree';
import HostTable from './HostTable';

type ParamTypes = {
    tagId: string;
}

type PropType = {
    wholeTree: Host;
}


export default (props: PropType): any => {
    console.log("TableWrapper")
    let match = useRouteMatch();
    let history = useHistory();
    let { tagId } = useParams<ParamTypes>();
    let dispatch = useDispatch();
    const onRowClicked = (row: Host): void => {
        if (row.dir) {
            dispatch(setSelected(row.id+''));
            history.push(`/objects/table/${row.id}`);
        } else {
            history.push(`/objects/edit/${row.id}`);
        }
        
    }
    let hosts = findByTag(props.wholeTree, +tagId);
    return (
    <HostTable
        tableTitle={`All items with tag ${tagId}`}
        parentId={-1}
        onEntryDelete={(row) => {dispatch(deleteObject(row.id))}}
        onRowClicked={onRowClicked}
        data={hosts} />);
}
