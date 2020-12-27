import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams, useRouteMatch } from 'react-router-dom';
import { Host } from '../../models/host';
import HostForm from './HostForm';
import HostTable from './HostTable';
import { setSelected, setBrowserEdit } from '../../state/actions/local';
import TestTable from './TestTable';

type ParamTypes = {
    parentId: string;
}

type PropType = {
    wholeTree: Host;
    selectedDir: string;
}

const findHostById = (root: Host, id: number): Host | null => {
    let found: Host[] = [];
    const findHostRecurse = (root: Host, id: number, found: Host[]) => {
        if (root.id === id) {
            found.push(root);
            return
        } else if (root.dir) {
            for (const e of root.chld) {
                if (!e.dir) continue;
                findHostRecurse(e, id, found);
            }
        }
    }
    findHostRecurse(root, id, found);
    return (found.length > 0) ? found[0] : null
}

export default (props: PropType): any => {
    let match = useRouteMatch();
    let history = useHistory();
    let { parentId } = useParams<ParamTypes>();
    let dispatch = useDispatch();
    const onRowClicked = (row: Host): void => {
        if (row.dir) {
            dispatch(setSelected(row.id+''));
            history.push(`/objects/table/${row.id}`);
        } else {
            history.push(`/objects/edit/${row.id}`);
        }
        
    }
    let hosts = findHostById(props.wholeTree, +parentId);

    console.log(hosts);

    return (
    <HostTable  
        onRowClicked={onRowClicked}
        data={(hosts && hosts.dir) ? hosts.chld : []} />);
}
