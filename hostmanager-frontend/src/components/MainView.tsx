import { Grid } from '@material-ui/core';
import { Titlebar } from 'custom-electron-titlebar';
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import HostsBrowser from './HostsBrowser';
import MainPage from './MainPage';
import MenuColumn from './MenuColumn';
import ProtocolPage from './ProtocolPage';
import TagPage from './TagPage';

type PropsType = {
    titlebar: Titlebar;
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

export default class MainView extends React.Component {
    constructor(props: PropsType) {
        super(props);
    }

    render() {
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
                        <div>Search</div>
                    </Route>
                    <Route path="/map">
                        <div>Object graph</div>
                    </Route>
                    <Route path="/notes">
                        <div>Notes</div>
                    </Route>
                    <Route path="/protocols">
                        <ProtocolPage />
                    </Route>
                    <Route path="/tags">
                        <TagPage />
                    </Route>
                    <Route path="/settings">
                        <div>Settings there</div>
                    </Route>
                    <Route path="/">
                        <MainPage></MainPage>
                    </Route>
                </Switch>
            </div>
        </div>);
    }
}