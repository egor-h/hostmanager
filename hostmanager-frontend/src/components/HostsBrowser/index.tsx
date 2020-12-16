import { Grid, Paper } from '@material-ui/core'
import { TreeItem } from '@material-ui/lab'
import TreeView from '@material-ui/lab/TreeView/TreeView'
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { withStyles } from '@material-ui/core/styles';
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import HostTree from './HostTree';
import HostTable from './HostTable';
import { fetchTree } from '../../api/tree'
import { Host } from '../../models/host';


const styles = {
    root: {
      height: 216,
      flexGrow: 1,
      maxWidth: 400,
    },
    paper: {
      
    }
  }

type HostsBrowserProps = {
    tree: {
        loading: boolean,
        tree: Host,
        error: boolean
    };
    getTree: any;
}

class HostsBrowser extends React.Component<HostsBrowserProps> {
    constructor(props: any) {
        super(props);
    }

    componentDidMount() {
        this.props.getTree();
    }

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

const mapStateToProps = (state: any) => ({
    tree: state.hostsBrowser.tree
});

const mapDispatchToProps = (dispatch: any) => ({
    getTree: bindActionCreators(fetchTree, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(HostsBrowser))