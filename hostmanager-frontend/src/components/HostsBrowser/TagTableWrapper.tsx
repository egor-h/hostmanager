import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { deleteObject, fetchTree } from '../../api/tree';
import { Host } from '../../models/host';
import { setSelected } from '../../state/actions/local';
import { AppState } from '../../state/reducers';
import { findByTag } from '../../util/tree';
import HostTable from './HostTable';
import { IconButton, Tooltip } from '@material-ui/core';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import { executeProtocolThunk } from '../../util/launcher';

type ParamTypes = {
    tagId: string;
}

type PropType = {
    wholeTree: Host;
}


export default (props: PropType): any => {
    let history = useHistory();
    let settings = useSelector((state: AppState) => state.local.settings);
    let protocolResults = useSelector((state: AppState) => state.local.protocolResults);
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
    const pingAll = () => {
        hosts.forEach(host => {
            if (host.dir) {
                return;
            }
            dispatch(executeProtocolThunk(host, {
                id: 5,
                name: 'ICMP ping',
                executionLine: 'ping {address} /n 1',
                launchType: 'VALIDATE_OUTPUT',
                validationRegex: 'TTL',
                expectedExitCode: 0
              }));
        });
    }

    return (
    <HostTable
        tableTitle={`All items with tag ${tagId}`}
        protocolResults={protocolResults}
        additionalButtons={<Tooltip title="Ping all objects">
            <IconButton onClick={() => {pingAll();}} aria-label="filter list">
              <PlayArrowIcon />
            </IconButton>
          </Tooltip>}
        parentId={-1}
        onEntryDelete={(row) => {dispatch(deleteObject(row.id, () => {dispatch(fetchTree(settings.rootNode))}))}}
        onRowClicked={onRowClicked}
        data={hosts} />);
}
