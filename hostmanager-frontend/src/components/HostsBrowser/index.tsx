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
    useParams,
    Redirect
  } from "react-router-dom";
import HostForm from './HostForm';
import EditHostWrapper from './EditHostWrapper';
import NewHostWrapper from './NewHostWrapper';
import TableWrapper from './TableWrapper';


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
        const selectView = () => {
            switch (this.props.local.browserMode) {
                case "table":
                    return (<TableWrapper selectedDir={this.props.local.selected} wholeTree={this.props.tree.tree} />);
                case "edit":
                    return(<EditHostWrapper hostId={"123"}></EditHostWrapper>);
                case "new":
                    return (<NewHostWrapper></NewHostWrapper>);
                default:
                    return (<div>default</div>)
            }

        }
        return (<Grid container direction="row" justify="flex-start" alignItems="stretch">
            <Grid xs={4} >
                <HostTree></HostTree>
            </Grid>
            <Grid xs={8} >      
                {/* <Link to={`${this.props.match.url}`}>root</Link>
                <Link to={`${this.props.match.url}/edit/33`}>edit</Link>
                <Link to={`${this.props.match.url}/table/33`}>edit</Link>
                <button onClick={() => {this.props.history.push(`${this.props.match.url}`)}}>
                    root
                </button>
                <Switch>
                    <Route exact path={`${this.props.match.url}/new/:parentId`}>
                        <NewHostWrapper></NewHostWrapper>
                    </Route>
                    <Route exact path={`${this.props.match.url}/edit/:hostId`}>
                        <EditHostWrapper></EditHostWrapper>
                    </Route>
                    <Route exact path={`${this.props.match.url}/table/:parentId`}>
                        <TableWrapper wholeTree={this.props.tree.tree} />
                    </Route>
                    <Route exact path={`${this.props.match.url}/`}>
                        <Redirect to={`/objects/table/33`} ></Redirect>
                    </Route>
                </Switch>             */}
                {selectView()}
            </Grid>
        </Grid>)
    }
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