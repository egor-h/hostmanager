import { Breadcrumbs } from '@material-ui/core';
import MaterialLink from '@material-ui/core/Link';
import { withStyles } from '@material-ui/core/styles';
import React from 'react';
import { connect } from 'react-redux';
import { Link, Redirect, Route, RouteComponentProps, Switch, withRouter } from "react-router-dom";
import { bindActionCreators } from 'redux';
import { fetchTags } from '../../api/tag';
import { fetchTree } from '../../api/tree';
import { Host } from '../../models/host';
import { local } from '../../state/actions';
import { TreeState } from '../../state/reducers/hostsBrowser';
import { LocalState } from '../../state/reducers/localState';
import { findHostById } from '../../util/tree';
import EditHostWrapper from './EditHostWrapper';
import HostInfoWrapper from './HostInfoWrapper';
import HostTree from './HostTree';
import NewHostWrapper from './NewHostWrapper';
import TableWrapper from './TableWrapper';
import TagTableWrapper from './TagTableWrapper';

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
    getTags: any;
    setSelected: any;
} & RouteComponentProps;

type BreadCrumbProps = {
    links: { title: string, url: string, id: number }[];
    setSelected: (selcted: string) => void
}

const HostBreadCrumb = (props: BreadCrumbProps) => {
    return (<Breadcrumbs aria-label="breadcrumb">
        {props.links.map(link => (<MaterialLink key={link.title} component={Link} to={link.url} onClick={() => props.setSelected(link.id+'')} color="inherit" >{link.title}</MaterialLink>))}
    </Breadcrumbs>)
}

const resolveBreadcrumbs = (selected: number, tree: Host) => {
    let found = findHostById(tree, selected);
    if (found === null) {
        return [{title: `Host ${selected} not found`, url: `/objects/table`,  id: 0}];
    }
    let locationsList = [];
    locationsList.push({title: found.name, url: `/objects/table/${found.id}`, id: found.id});
    while (found.parentId !== 0) { 
        found = findHostById(tree, found.parentId);
        if (found === null) {
            break;
        }
        locationsList.push({title: found.name, url: `/objects/table/${found.id}`, id: found.id});
    }
    return locationsList.reverse();
}

class HostsBrowser extends React.Component<HostsBrowserProps> {
    constructor(props: any) {
        super(props);
    }

    componentDidMount() {
        if (!this.props.tree.tree.dir) {
            this.props.getTree();
            this.props.getTags();
        }
    }

    render() {
        return (<div style={{ flexDirection: 'row', display: 'flex', height: 'calc(100% - 24px)' }}>
            <div style={{ flex: 2, display: 'flex', flexFlow: 'column nowrap' }}>
                <HostTree ></HostTree>
            </div>
            <div style={{ flex: 3, display: 'flex', flexFlow: 'column nowrap' }}>
                <div style={{ flex: 0, flexFlow: 'row nowrap' }}>
                    <HostBreadCrumb 
                        setSelected={this.props.setSelected}
                        links={resolveBreadcrumbs(+this.props.local.selected, this.props.tree.tree)} 
                    />
                </div>

                <Switch>
                    <Route exact path="/objects/table/:parentId">
                        <TableWrapper selectedDir={this.props.local.selected} wholeTree={this.props.tree.tree} />
                    </Route>
                    <Route exact path="/objects/tableTag/:tagId">
                        <TagTableWrapper wholeTree={this.props.tree.tree} />
                    </Route>
                    <Route exact path="/objects/new/:parentId">
                        <NewHostWrapper></NewHostWrapper>
                    </Route>
                    <Route exact path="/objects/edit/:hostId">
                        <EditHostWrapper></EditHostWrapper>
                    </Route>
                    <Route exact path="/objects/info/:hostId">
                        <HostInfoWrapper></HostInfoWrapper>
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
    getTags: bindActionCreators(fetchTags, dispatch),
    setSelected: bindActionCreators(local.setSelected, dispatch)
});

let HostsBrowserRouted = withRouter(HostsBrowser);
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(HostsBrowserRouted));