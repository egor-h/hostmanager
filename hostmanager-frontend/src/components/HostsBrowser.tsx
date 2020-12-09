import { Grid, Paper } from '@material-ui/core'
import { TreeItem } from '@material-ui/lab'
import TreeView from '@material-ui/lab/TreeView/TreeView'
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { withStyles } from '@material-ui/core/styles';
import React from 'react'

import HostTree from './HostTree'
import HostTable from './HostTable';

const styles = {
    root: {
      height: 216,
      flexGrow: 1,
      maxWidth: 400,
    },
    paper: {
      
    }
  }

class HostsBrowser extends React.Component {
    render() {
        return (<Grid container direction="row" justify="flex-start" alignItems="stretch">
            <Grid xs={4} >
                <HostTree></HostTree>
            </Grid>
            <Grid xs={8} >
                <HostTable></HostTable>
            </Grid>
        </Grid>)
    }
}

export default withStyles(styles)(HostsBrowser)