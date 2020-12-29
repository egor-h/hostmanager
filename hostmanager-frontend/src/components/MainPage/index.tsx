import { Paper, Typography } from '@material-ui/core';
import React from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as home  from '../../api/home';
import { RecentHost } from '../../models/host';
import { HomeState } from '../../state/reducers/home';
import ClircleLoading from '../CircleLoading';
import RecentHostCard from './RecentHostCard';
import RecentHostList from './RecentHostList';


type HomePageProps = {
    recents: HomeState;
    getRecentHosts: any;
}

class MainPage extends React.Component<HomePageProps> {
    constructor(props: any) {
        super(props);
    }

    componentDidMount() {
        console.log("MainPage did mount");
        this.props.getRecentHosts();
    }

    render() {
        if (this.props.recents.loading) {
            return (<ClircleLoading></ClircleLoading>);
        }
        if (this.props.recents.error) {
            return (<div>An error occured check console</div>);
        }
        return (<Paper elevation={0}>
            <Typography variant="h4" component="h4" style={{flexBasis: '100%'}} >Hello! {this.props.recents.data.hostsTotal} hosts in total!</Typography>
            <RecentHostList items={this.props.recents.data.recents}></RecentHostList>
        </Paper>)
    }
}

const mapStateToProps = (state: any) => ({
    recents: state.home
})

const mapDispatchToProps = (dispatch: any) => ({
    getRecentHosts: bindActionCreators(home.fetchRecents, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);