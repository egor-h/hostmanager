import { Box, Tooltip, Typography } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import React from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { Link, RouteComponentProps, useHistory, useParams, withRouter } from 'react-router-dom';
import { AppState } from '../../state/reducers';
import { TreeState } from '../../state/reducers/hostsBrowser';
import { NotesForHostState } from '../../state/reducers/notes';
import { ProtocolState } from '../../state/reducers/protocols';
import { TagState } from '../../state/reducers/tags';
import { findExactHostById } from '../../util/tree';
import ClircleLoading from '../CircleLoading';
import { TagChips } from '../MainPage/TagChips';
import NoteList from './NoteList';
import ProtocolList from './ProtocolList';

type ParamTypes = {
    hostId: string;
}

type HostInfoProps = {
    tree: TreeState;
    protocols: ProtocolState;
    notes: NotesForHostState;
} & RouteComponentProps<{hostId: string}>;

const mapStateToProps = (state: AppState) => ({
    tree: state.hostsBrowser.tree,
    protocols: state.protocols,
    notes: state.notes.notesForHost
});

const mapDispatchToProps = (dispatch: any) => ({

})

class HostInfoWrapper extends React.Component<HostInfoProps> {
    constructor(props: HostInfoProps) {
        super(props);
    }

    componentDidMount() {

    }

    render() {
        // let { hostId } = useParams<ParamTypes>();
        // let dispatch = useDispatch();
        // let history = useHistory();

        // let tree = useSelector((state: { hostsBrowser: { tree: TreeState } }) => state.hostsBrowser.tree)
        // let protocols = useSelector((state: { protocols: ProtocolState }) => state.protocols);

        if (this.props.tree.loading) {
            return (<ClircleLoading />)
        }

        if (this.props.tree.error) {
            return <p>Error</p>
        }

        let foundHost = findExactHostById(this.props.tree.tree, +this.props.match.params.hostId);

        if (!foundHost) {
            console.log(foundHost);
            return (<p>Host with {this.props.match.params.hostId} id not found</p>)
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
                <ProtocolList host={foundHost} protocols={this.props.protocols.data} />
            </div>
            <div style={{ display: 'flex', flexBasis: '100%', flexWrap: "wrap" }}>
                <NoteList host={foundHost} notes={this.props.notes.data} />
            </div>

        </Box>);
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(HostInfoWrapper));

// export default (): any => {
//     let { hostId } = useParams<ParamTypes>();
//     let dispatch = useDispatch();
//     let history = useHistory();

//     let tree = useSelector((state: { hostsBrowser: { tree: TreeState } }) => state.hostsBrowser.tree)
//     let protocols = useSelector((state: { protocols: ProtocolState }) => state.protocols);

//     if (tree.loading) {
//         return (<ClircleLoading />)
//     }

//     if (tree.error) {
//         return <p>Error</p>
//     }

//     let foundHost = findExactHostById(tree.tree, +hostId);

//     if (!foundHost) {
//         console.log(foundHost);
//         return (<p>Host with {hostId} id not found</p>)
//     }

//     let editHostLink = (<Link to={`/objects/edit/${foundHost.id}`}>
//         <Tooltip title="Edit host" placement="right">
//             <IconButton aria-label="edit">
//                 <EditIcon />
//             </IconButton>
//         </Tooltip>
//     </Link>)
//     return (<Box display="flex" flexWrap="wrap">
//         <div style={{ display: 'flex', flexBasis: '100%', flexWrap: "wrap" }}>
//             <Typography variant="h4" component="h4">{editHostLink} {foundHost.name}</Typography>
//         </div>
//         <Typography variant="h5" component="h5" style={{ flexBasis: '100%' }}>{foundHost.address}</Typography>
//         <TagChips tagList={foundHost.tags} />
//         <div style={{ display: 'flex', flexBasis: '100%', flexWrap: "wrap" }}>
//             <ProtocolList host={foundHost} protocols={protocols.data} />
//         </div>

//     </Box>);
// }