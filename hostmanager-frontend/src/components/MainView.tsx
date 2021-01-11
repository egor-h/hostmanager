import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { Route, RouteComponentProps, Switch, withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { authNull } from '../state/actions/auth';
import { setIntervalId, setSnackbar } from '../state/actions/local';
import { AppState } from '../state/reducers';
import { AuthState } from '../state/reducers/auth';
import { TreeState } from '../state/reducers/hostsBrowser';
import { LocalState, SnackbarData } from '../state/reducers/localState';
import { addKeyEventListener, KeysMap } from '../util/events';
import { KEY_1, KEY_2, KEY_3, KEY_4, KEY_5, KEY_6, KEY_7, KEY_8, KEY_9, KEY_F, KEY_Q } from '../util/keyboard_codes';
import { cleanOldResultsThunk } from '../util/launcher';
import AppSnackbar from './AppSnackbar';
import AuthForm from './AuthForm';
import HostsBrowser from './HostsBrowser';
import MainPage from './MainPage';
import MapPage from './MapPage';
import MenuColumn from './MenuColumn';
import NotePage from './NotePage';
import ProtocolPage from './ProtocolPage';
import SearchPage from './SearchPage';
import SettingsPage from './SettingsPage';
import StatisticPage from './StatisticPage';
import TagPage from './TagPage';


type PropsType = {
    local: LocalState;
    auth: AuthState;
    tree: TreeState;
    doCleanupResults: () => void;
    setIntervalId: (id: number) => void;
    setSnackBar: (data: SnackbarData) => void;
    logout: () => void;
} & RouteComponentProps;


const sideNavStyle = {
    flex: 1,
    height: '95vh',
    color: 'white',
    overflow: 'auto',
  }
  
  const content = {
    flex: 10,
    height: '95vh',
    overflow: 'auto',
  }

class MainView extends React.Component<PropsType> {
    constructor(props: PropsType) {
        super(props);
    }

    componentDidMount() {
        let intervalId = setInterval(() => {
            this.props.doCleanupResults();
        }, 60000);
        this.props.setIntervalId(intervalId);

        let thisNode = ReactDOM.findDOMNode(this);

        let keysObj: KeysMap = {
            HOME_KEY: {
                keyCode: [KEY_1], withAlt: false, withCtrl: true, action: () => this.props.history.push("/"),
            },
            BROWSER_KEY: {
                keyCode: [KEY_2], withAlt: false, withCtrl: true, action: () => this.props.history.push("/objects"),
            },
            SEARCH_KEY: {
                keyCode: [KEY_3, KEY_F], withAlt: false, withCtrl: true, action: () => this.props.history.push("/search"),
            },
            MAP_KEY: {
                keyCode: [KEY_4], withAlt: false, withCtrl: true, action: () => this.props.history.push("/map"),
            },
            NOTE_KEY: {
                keyCode: [KEY_5], withAlt: false, withCtrl: true, action: () => this.props.history.push("/notes"),
            },
            PROTOCOL_KEY: {
                keyCode: [KEY_6], withAlt: false, withCtrl: true, action: () => this.props.history.push("/protocols"),
            },
            TAGS_KEY: {
                keyCode: [KEY_7], withAlt: false, withCtrl: true, action: () => this.props.history.push("/tags"),
            },
            STAT_KEY: {
                keyCode: [KEY_8], withAlt: false, withCtrl: true, action: () => this.props.history.push("/stats"),
            },
            SETTINGS_KEY: {
                keyCode: [KEY_9], withAlt: false, withCtrl: true, action: () => this.props.history.push("/settings"),
            },
            LOGOUT_KEY: {
                keyCode: [KEY_Q], withAlt: true, withCtrl: true, action: () => this.props.logout(),
            },
        }

        if (thisNode !== null) {
            addKeyEventListener(window, thisNode, keysObj);
        }
    }

    componentWillUnmount() {
        clearInterval(this.props.local.intervalId);
    }

    render() {
        if (this.props.auth.data === null) {
            return (<AuthForm></AuthForm>);
        }
        return (
        <div style={{display: 'flex'}}>
            <div style={sideNavStyle}>
                <MenuColumn></MenuColumn>
            </div>
            <div style={content}>
            
                <Switch>
                        <Route path="/objects">
                            <HostsBrowser></HostsBrowser>
                        </Route>
                        <Route path="/search">
                            <SearchPage />
                        </Route>
                        <Route path="/map">
                            <MapPage tree={this.props.tree.tree}/>
                        </Route>
                        <Route path="/notes">
                            <NotePage />
                        </Route>
                        <Route path="/protocols">
                            <ProtocolPage />
                        </Route>
                        <Route path="/tags">
                            <TagPage />
                        </Route>
                        <Route path="/settings">
                            <SettingsPage />
                        </Route>
                        <Route path="/stats">
                            <StatisticPage />
                        </Route>
                        <Route path="/">
                            <MainPage></MainPage>
                        </Route>
                </Switch>
            </div>
            <AppSnackbar />
        </div>);
    }
}

const mapStateToProps = (state: AppState) => ({
    local: state.local,
    auth: state.auth,
    tree: state.hostsBrowser.tree
});

const mapDispatchToProps = (dispatch: any) => ({
    doCleanupResults: bindActionCreators(cleanOldResultsThunk, dispatch),
    setIntervalId: bindActionCreators(setIntervalId, dispatch),
    setSnackBar: bindActionCreators(setSnackbar, dispatch),
    logout: bindActionCreators(authNull, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(MainView));