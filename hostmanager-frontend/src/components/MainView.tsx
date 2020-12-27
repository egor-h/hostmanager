import { Grid } from '@material-ui/core';
import { Titlebar } from 'custom-electron-titlebar';
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import HostsBrowser from './HostsBrowser';
import MainPage from './MainPage';
import MenuColumn from './MenuColumn';

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
                    <Route path="/map">
                        <div>Object graph</div>
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