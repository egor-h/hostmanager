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
import { TreeState } from '../../state/reducers/hostsBrowser';
import { LocalState } from '../../state/reducers/localState';


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
    tree: TreeState;
    local: LocalState;
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
        let hosts = findHostById(this.props.tree.tree, +this.props.local.selected);
        console.log("found:");
        console.log(hosts);
        return (<Grid container direction="row" justify="flex-start" alignItems="stretch">
            <Grid xs={4} >
                <HostTree></HostTree>
            </Grid>
            <Grid xs={8} >
                <HostTable data={(hosts && hosts.dir) ? hosts.chld : []} ></HostTable>
            </Grid>
        </Grid>)
    }
}

const findHostById = (root: Host, id: number): Host | null => {
    let queue: number[] = [];
    const getElem = () => {
        let e = queue[0];
        queue = queue.slice(1);
        return e;
    }
    const pushElem = (newElem: number) => {
        queue.push(newElem);
    }

    let foundItem = null;
    if (root.id === id) {
        foundItem = root;
    }

    for (const e of root.chld) {
        if (foundItem) {
            return foundItem;
        }
        if (root.dir) {
            
        }
    }
    return null;
}

const mapStateToProps = (state: any) => {
    console.log(state);
    return ({
    tree: state.hostsBrowser.tree,
    local: state.local
})};

const mapDispatchToProps = (dispatch: any) => ({
    getTree: bindActionCreators(fetchTree, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(HostsBrowser))