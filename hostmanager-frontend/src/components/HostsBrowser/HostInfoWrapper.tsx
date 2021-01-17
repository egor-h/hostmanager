import { Box, Tooltip, Typography } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory, useParams } from 'react-router-dom';
import { TreeState } from '../../state/reducers/hostsBrowser';
import { ProtocolState } from '../../state/reducers/protocols';
import { TagState } from '../../state/reducers/tags';
import { findExactHostById } from '../../util/tree';
import ClircleLoading from '../CircleLoading';
import { TagChips } from '../MainPage/TagChips';
import ProtocolList from './ProtocolList';

type ParamTypes = {
    hostId: string;
}

export default (): any => {
    let { hostId } = useParams<ParamTypes>();
    let dispatch = useDispatch();
    let history = useHistory();

    let tree = useSelector((state: { hostsBrowser: { tree: TreeState } }) => state.hostsBrowser.tree)
    let protocols = useSelector((state: {protocols: ProtocolState}) => state.protocols);

    if (tree.loading) {
        return (<ClircleLoading />)
    }

    if (tree.error) {
        return <p>Error</p>
    }

    let foundHost = findExactHostById(tree.tree, +hostId);

    if (!foundHost) {
        console.log(foundHost);
        return (<p>Host with {hostId} id not found</p>)
    }

    let editHostLink = (<Link to={`/objects/edit/${foundHost.id}`}>
        <Tooltip title="Edit host" placement="right">
            <IconButton aria-label="edit">
                <EditIcon />
            </IconButton>
        </Tooltip>
    </Link>)
    return (<Box display="flex" flexWrap="wrap">
        <div style={{ display: 'flex', flexBasis: '100%', flexWrap: "wrap" }}>
            <Typography variant="h4" component="h4">{editHostLink} {foundHost.name}</Typography>
        </div>
        <Typography variant="h5" component="h5" style={{ flexBasis: '100%' }}>{foundHost.address}</Typography>
        <TagChips tagList={foundHost.tags} />
        <div style={{ display: 'flex', flexBasis: '100%', flexWrap: "wrap" }}>
            <ProtocolList host={foundHost} protocols={protocols.data} />
        </div>
    </Box>);
}