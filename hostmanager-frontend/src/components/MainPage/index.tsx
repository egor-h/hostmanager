import React from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as home  from '../../api/home';
import { RecentHost } from '../../models/host';

type Recents = {
    loading: boolean,
    data: RecentHost[],
    error: boolean
}

type HomePageProps = {
    recents: Recents;
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
            return (<div>Loading..</div>);
        }
        if (this.props.recents.error) {
            return (<div>An error occured check console</div>);
        }
        let r = this.props.recents.data.map((recent):any => (<li key={recent.id+''}>{recent.name}</li>))
        return (<div>{r}</div>)
    }
}

const mapStateToProps = (state: any) => {
    console.log("Home state");
    console.log(state.home.recents);
    return ({
    recents: state.home.recents
})}

const mapDispatchToProps = (dispatch: any) => ({
    getRecentHosts: bindActionCreators(home.fetchRecents, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);