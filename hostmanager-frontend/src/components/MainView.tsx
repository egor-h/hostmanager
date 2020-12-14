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

export default class MainView extends React.Component {
    constructor(props: PropsType) {
        super(props);
    }

    render() {
        return (<Grid container direction="row" justify="flex-start" alignItems="stretch">
            <Grid xs={1} >
                <MenuColumn></MenuColumn>
            </Grid>
            <Grid xs={11}>
            
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
            
            </Grid>
        </Grid>)
    }
}