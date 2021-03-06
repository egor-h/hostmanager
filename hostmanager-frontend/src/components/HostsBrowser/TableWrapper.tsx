import { IconButton } from '@material-ui/core';
import Tooltip from '@material-ui/core/Tooltip';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { deleteObject, fetchTree } from '../../api/tree';
import { Host, Protocol } from '../../models/host';
import { setSelected, setSnackbar } from '../../state/actions/local';
import { AppState } from '../../state/reducers';
import { findHostById } from '../../util/tree';
import HostTable from './HostTable';
import LoadingHostTableSkeleton from './LoadingHostTableSkeleton';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import { executeProtocolThunk, executeProtocolsThunk, executePortCheckThunk } from '../../util/launcher';
import AvailabilityDialog from './AvailabilityCheck';
import Mousetrap from 'mousetrap';
import { internal, PORT_CHECK_LOCAL_ID, PORT_CHECK_REMOTE_ID } from '../../state/reducers/protocols';

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
    let settings = useSelector((state: AppState) => state.local.settings);
    let tree = useSelector((state: AppState) => state.hostsBrowser.tree);
    let protocolResults = useSelector((state: AppState) => state.local.protocolResults);
    const [showAvailPopup, setAvailPopup] = React.useState<boolean>(false);
    
    useEffect(() => {
        Mousetrap.bind("f5", () => { setAvailPopup(!showAvailPopup); })
    });

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

    const pingAll = () => {
        if (hosts === null || hosts.chld === undefined) {
            return;
        }

        dispatch(executeProtocolsThunk(hosts.chld, {
            id: 5,
            name: 'ICMP ping',
            executionLine: 'ping {address} /n 1',
            launchType: 'VALIDATE_OUTPUT',
            validationRegex: 'TTL',
            expectedExitCode: 0
          }));
    }

    const icmp: Protocol = {
        id: 5,
        name: 'ICMP ping',
        executionLine: 'ping {address} /n 1',
        launchType: 'VALIDATE_OUTPUT',
        validationRegex: 'TTL',
        expectedExitCode: 0
      }
    
    return (
        <HostTable
        tableTitle={"Hosts"}
        parentId={+parentId}
        onRowClicked={onRowClicked}
        protocolResults={protocolResults}
        additionalButtons={<Tooltip title="Ping all objects">
            <IconButton onClick={() => {pingAll();}} aria-label="filter list">
              <PlayArrowIcon />
            </IconButton>
          </Tooltip>}
        onEntryDelete={(row) => {
            dispatch(deleteObject(row.id, () => {dispatch(fetchTree(settings.rootNode))}));
        }}
        // popups={[]}
        popups={[<AvailabilityDialog hosts={hosts === null ? [] : hosts.chld} protocols={[...internal, icmp]} onProtocolSelected={(p) => {
            if (hosts === null) {
                setAvailPopup(false);
                return;
            }

            if (p.id === PORT_CHECK_LOCAL_ID) {
                dispatch(setSnackbar({severity: 'info', message: `Check ${hosts.chld.length} hosts`}));
                dispatch(executePortCheckThunk(hosts.chld))
                setAvailPopup(false);
                return;
            }

            if (p.id === PORT_CHECK_REMOTE_ID) {
                return;
            }

            dispatch(setSnackbar({severity: 'info', message: `Check port on  ${hosts.chld.length} hosts`}));
            dispatch(executeProtocolsThunk(hosts.chld, p));
            setAvailPopup(false);
            
        }} open={showAvailPopup} selectedValue="" onClose={() => {setAvailPopup(false)}}/>]}
        data={(hosts && hosts.dir) ? hosts.chld : []} />);
}
