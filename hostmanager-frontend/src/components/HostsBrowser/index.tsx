import { Breadcrumbs, Grid, Paper, Typography } from '@material-ui/core'
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
import Container from '@material-ui/core/Container';
import MaterialLink from '@material-ui/core/Link';


const styles = {
    root: {
    //   height: 216,
    //   flexGrow: 1,
    //   maxWidth: 400,
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

const DATA = [
    {id: 1, name: '123', address: '123', dir: false, chld: []},
    {id: 2, name: '123', address: '123', dir: false, chld: []},
    {id: 3, name: '123', address: '123', dir: false, chld: []},
    {id: 4, name: '123', address: '123', dir: false, chld: []},
    {id: 5, name: '123', address: '123', dir: false, chld: []},
    {id: 6, name: '123', address: '123', dir: false, chld: []},
    {id: 7, name: '123', address: '123', dir: false, chld: []},
    {id: 8, name: '123', address: '123', dir: false, chld: []},
    {id: 9, name: '123', address: '123', dir: false, chld: []},
    {id: 10, name: '123', address: '123', dir: false, chld: []},
    {id: 11, name: '123', address: '123', dir: false, chld: []},
    {id: 12, name: '123', address: '123', dir: false, chld: []},
    {id: 13, name: '123', address: '123', dir: false, chld: []},
    {id: 14, name: '123', address: '123', dir: false, chld: []},
    {id: 15, name: '123', address: '123', dir: false, chld: []},
    {id: 16, name: '123', address: '123', dir: false, chld: []},
    {id: 17, name: '123', address: '123', dir: false, chld: []},
]


type BreadCrumbProps = {
    links: {title: string, url: string}[]
}

const HostBreadCrumb = (props: BreadCrumbProps) => {
    return (<Breadcrumbs aria-label="breadcrumb">
        {props.links.map(link => (<MaterialLink key={link.title} color="inherit" onClick={() => {}}>{link.title}</MaterialLink>))}
    {/* <MaterialLink color="inherit"  onClick={() => {}}>
      Material-UI
    </MaterialLink>
    <MaterialLink color="inherit"  onClick={() => {}}>
      Core
    </MaterialLink>
    <Typography color="textPrimary">Breadcrumb</Typography> */}
  </Breadcrumbs>)
}

class HostsBrowser extends React.Component<HostsBrowserProps> {
    constructor(props: any) {
        super(props);
    }

    componentDidMount() {
        this.props.getTree();
    }

    render() {
        return (<div style={{flexDirection: 'row', display: 'flex', height: 'calc(100% - 24px)'}}>
            <div style={{flex: 2, display: 'flex', flexFlow: 'column nowrap'}}>
                <HostTree ></HostTree>
            </div>
            <div style={{flex: 3, display: 'flex', flexFlow: 'column nowrap'}}>
                <div style={{flex: 0, flexFlow: 'row nowrap'}}><HostBreadCrumb links={[{title: 'smporg', url:'/objects/table/33'}, {title: 'smporg', url:'/objects/table/33'}]}/></div>

                <Switch>
                    <Route exact path="/objects/table/:parentId">
                        <TableWrapper selectedDir={this.props.local.selected} wholeTree={this.props.tree.tree} />
                    </Route>
                    <Route exact path="/objects/new/:parentId">
                        <NewHostWrapper></NewHostWrapper>
                    </Route>
                    <Route exact path="/objects/edit/:hostId">
                        <EditHostWrapper></EditHostWrapper>
                    </Route>
                    <Route exact path="/objects/info/:hostId">
                        
                    </Route>
                    <Route exact path="">
                        <Redirect to="/objects/table/33"></Redirect>
                    </Route>
                </Switch>                
            </div>
        </div>);
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