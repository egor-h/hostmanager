import { Grid } from '@material-ui/core';
import { Titlebar } from 'custom-electron-titlebar';
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { LocalState, SnackbarData } from '../state/reducers/localState';
import HostsBrowser from './HostsBrowser';
import MainPage from './MainPage';
import MenuColumn from './MenuColumn';
import NotePage from './NotePage';
import ProtocolPage from './ProtocolPage';
import TagPage from './TagPage';
import SearchPage from './SearchPage';
import { bindActionCreators } from 'redux';
import { cleanOldResultsThunk } from '../util/launcher';
import { connect } from 'react-redux';
import { hideSnackbar, setIntervalId, setSnackbar } from '../state/actions/local';
import StatisticPage from './StatisticPage';
import { AppState } from '../state/reducers';
import { AuthState } from '../state/reducers/auth';
import AuthForm from './AuthForm';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import AppSnackbar from './AppSnackbar';
import SettingsPage from './SettingsPage';


type PropsType = {
    local: LocalState;
    auth: AuthState;
    doCleanupResults: () => void;
    setIntervalId: (id: number) => void;
    setSnackBar: (data: SnackbarData) => void;
}


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
    }

    componentWillUnmount() {
        clearInterval(this.props.local.intervalId);
    }

    render() {
        if (this.props.auth.data === null) {
            return (<AuthForm></AuthForm>);
        }
        return (<div style={{display: 'flex'}}>
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
                        <div>Object graph</div>
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
    auth: state.auth
});

const mapDispatchToProps = (dispatch: any) => ({
    doCleanupResults: bindActionCreators(cleanOldResultsThunk, dispatch),
    setIntervalId: bindActionCreators(setIntervalId, dispatch),
    setSnackBar: bindActionCreators(setSnackbar, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(MainView);