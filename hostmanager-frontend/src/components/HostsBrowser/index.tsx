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
import { local } from '../../state/actions';

import {
    HashRouter as Router,
    Switch,
    Route,
    Link,
    withRouter,
    useParams
  } from "react-router-dom";


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
    setSelected: any;

    match: any;
    location: any;
    history: any;
}

class HostsBrowser extends React.Component<HostsBrowserProps> {
    constructor(props: any) {
        super(props);
    }

    componentDidMount() {
        this.props.getTree();
    }

    render() {
        console.log(`cur: ${this.props.match.url}`);
        let hosts = findHostById(this.props.tree.tree, +this.props.local.selected);
        console.log(hosts);
        console.log(this.props.local.selected);
        return (<Grid container direction="row" justify="flex-start" alignItems="stretch">
            <Grid xs={4} >
                <HostTree></HostTree>
            </Grid>
            <Grid xs={8} >      
                <Link to={`${this.props.match.url}`}>root</Link>
                <Link to={`${this.props.match.url}/edit/33`}>edit</Link>
                <button onClick={() => {this.props.history.push(`${this.props.match.url}`)}}>
                    root
                </button>
                <Switch>
                    <Route exact path={`${this.props.match.url}/new/:parentId`}>
                        <div>new host</div>
                    </Route>
                    <Route exact path={`${this.props.match.url}/edit/:hostId`}>
                        <div>editHost</div>
                    </Route>
                    <Route exact path={`${this.props.match.url}/`}>
                        <HostTable 
                        handleDoubleClick={(row: any) => {
                            if (row.dir) {
                                console.log("row is dir")
                                this.props.history.push(`${this.props.match.url}`)
                                this.props.setSelected(row.id+'');
                            } else {
                                console.log("row is NOT dir")
                                this.props.history.push(`${this.props.match.url}/edit/${row.id}`);
                            }
                        }} 
                        data={(hosts && hosts.dir) ? hosts.chld : []} />
                    </Route >
                </Switch>            
            </Grid>
        </Grid>)
    }
}

const findHostById = (root: Host, id: number): Host | null => {
    let found: Host[] = [];
    const findHostRecurse = (root: Host, id: number, found: Host[]) => {
        if (root.id === id) {
            found.push(root);
            return
        } else if (root.dir) {
            for (const e of root.chld) {
                if (!e.dir) continue;
                findHostRecurse(e, id, found);
            }
        }
    }
    findHostRecurse(root, id, found);
    return (found.length > 0) ? found[0] : null
}

const mapStateToProps = (state: any) => ({
    tree: state.hostsBrowser.tree,
    local: state.local
});

const mapDispatchToProps = (dispatch: any) => ({
    getTree: bindActionCreators(fetchTree, dispatch),
    setSelected: bindActionCreators(local.setSelected, dispatch)
});

let HostsBrowserRouted = withRouter(HostsBrowser);
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(HostsBrowserRouted));