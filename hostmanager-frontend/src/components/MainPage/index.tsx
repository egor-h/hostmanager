import { Chip, Paper, Typography } from '@material-ui/core';
import React from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as home from '../../api/home';
import * as tags from '../../api/tag';
import * as protocols from '../../api/protocol';
import { RecentHost } from '../../models/host';
import { HomeState } from '../../state/reducers/home';
import { TagState } from '../../state/reducers/tags';
import { auth } from '../../state/actions'
import ClircleLoading from '../CircleLoading';
import RecentHostList from './RecentHostList';
import { TagChips } from './TagChips';
import { IconButton, Tooltip } from '@material-ui/core';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { AppState } from '../../state/reducers';
import { AuthState } from '../../state/reducers/auth';


type HomePageProps = {
    recents: HomeState;
    tags: TagState;
    auth: AuthState;
    getRecentHosts: any;
    getTags: any;
    getProtocols: any;
    setNoAuth: any;
}

class MainPage extends React.Component<HomePageProps> {
    constructor(props: HomePageProps) {
        super(props);
    }

    componentDidMount() {
        this.props.getRecentHosts();
        this.props.getTags();
        this.props.getProtocols();
    }

    render() {
        if (this.props.recents.loading) {
            return (<ClircleLoading></ClircleLoading>);
        }
        if (this.props.recents.error) {
            return (<div>An error occured check console</div>);
        }
        return (<Paper elevation={0}>
            <Typography variant="h4" component="h4" style={{ flexBasis: '100%' }} >
                <Tooltip title="Log out" placement="right">
                    <IconButton onClick={() => this.props.setNoAuth()} aria-label="logout">
                        <ExitToAppIcon />
                    </IconButton>
                </Tooltip>
                Hello, {this.props.auth.data?.user.name}! {this.props.recents.data.hostsTotal} hosts in total!
            </Typography>
            <TagChips tagList={this.props.tags.data} ></TagChips>
            <RecentHostList items={this.props.recents.data.recents}></RecentHostList>
        </Paper>)
    }
}

const mapStateToProps = (state: AppState) => ({
    recents: state.home,
    tags: state.tags,
    auth: state.auth
})

const mapDispatchToProps = (dispatch: any) => ({
    getRecentHosts: bindActionCreators(home.fetchRecents, dispatch),
    getTags: bindActionCreators(tags.fetchTags, dispatch),
    getProtocols: bindActionCreators(protocols.fetchProtos, dispatch),
    setNoAuth: bindActionCreators(auth.authNull, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);