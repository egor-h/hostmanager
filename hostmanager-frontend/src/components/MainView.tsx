import React from 'react'
import { Grid, Paper } from '@material-ui/core';
import MenuColumn from './MenuColumn';
import HostsBrowser from './HostsBrowser';

export default class MainView extends React.Component {
    render() {
        return (<Grid container direction="row" justify="flex-start" alignItems="stretch">
            <Grid xs={1} >
                <MenuColumn></MenuColumn>
            </Grid>
            <Grid xs={11}>
                <HostsBrowser></HostsBrowser>
            </Grid>
        </Grid>)
    }
}