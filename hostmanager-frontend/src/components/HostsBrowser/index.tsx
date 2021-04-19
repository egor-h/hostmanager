import { withStyles } from '@material-ui/core/styles';
import { Skeleton } from '@material-ui/lab';
import React from 'react';
import ReactDOM from 'react-dom';
import SplitPane from 'react-flex-split-pane';
import { connect } from 'react-redux';
import { Redirect, Route, RouteComponentProps, Switch, withRouter } from "react-router-dom";
import { bindActionCreators } from 'redux';
import { fetchTags } from '../../api/tag';
import { fetchTree } from '../../api/tree';
import { Host } from '../../models/host';
import { local } from '../../state/actions';
import { TreeState } from '../../state/reducers/hostsBrowser';
import { LocalState } from '../../state/reducers/localState';
import { KeyEventListenerType, KeysMap } from '../../util/events';
import { KEY_N } from '../../util/keyboard_codes';
import { findAllDirs, findHostById } from '../../util/tree';
import EditHostWrapper from './EditHostWrapper';
import HostBreadCrumb from './HostBreadCrumb';
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
    getTree: (id: number) => void;
    getTags: () => void;
    setSelected: (nodeId: string) => void;
    setExpanded: (nodeIds: string[]) => void
} & RouteComponentProps;


const resolveBreadcrumbs = (selected: number, tree: Host) => {
    let found = findHostById(tree, selected);
    if (found === null) {
        return [{ title: `Host ${selected} not found`, url: `/objects/table`, id: 0 }];
    }
    let locationsList = [];
    locationsList.push({ title: found.name, url: `/objects/table/${found.id}`, id: found.id });
    while (found.parentId !== 0) {
        found = findHostById(tree, found.parentId);
        if (found === null) {
            break;
        }
        locationsList.push({ title: found.name, url: `/objects/table/${found.id}`, id: found.id });
    }
    return locationsList.reverse();
}

type State = {
    size: number;
    isResizing: boolean;
}

class HostsBrowser extends React.Component<HostsBrowserProps, State> {
    keysObj: KeysMap;
    keyListener: null | KeyEventListenerType;

    constructor(props: any) {
        super(props);
        this.state = {
            size: 250,
            isResizing: false
        }

        this.keysObj = {
            NEW_HOST_KEY: {
                keyCode: [KEY_N], withAlt: false, withCtrl: true, action: () => { console.log('N') },
            }
        }
        this.keyListener = null;
    }

    componentDidMount() {
        if (!this.props.tree.tree.dir) {
            this.props.getTree(this.props.local.settings.rootNode);
            this.props.getTags();
        }

        if (+this.props.local.selected < 2) {
            this.props.setSelected(this.props.local.settings.rootNode + '');
        }

        // let thisNode = ReactDOM.findDOMNode(this);

        // if (thisNode !== null) {
        //     this.keyListener = addKeyEventListener(window, thisNode, this.keysObj);
        // }

    }

    componentWillReceiveProps(nextProps: HostsBrowserProps) {
        if (nextProps.local.settings.expandTreeOnStartup) {
            if (nextProps.local.expanded.length === 0 && nextProps.tree.tree.dir) {
                console.log('set all expanded')
                this.props.setExpanded(findAllDirs(this.props.tree.tree).map(h => h.id + ''));
            }
        }
    }

    componentWillUnmount() {
        let thisNode = ReactDOM.findDOMNode(this);
        //     if (thisNode !== null && this.keyListener !== null) {
        //         removeKeyEventListener(thisNode, this.keyListener);
        //     }
    }

    render() {
        const onResizeStart = () => this.setState({ isResizing: true })
        const onResizeEnd = () => this.setState({ isResizing: false })
        const onChange = (size: number) => this.setState({ size })

        return (
            <SplitPane type="vertical"
                size={this.state.size}
                isResizing={this.state.isResizing}
                onResizeStart={onResizeStart}
                onResizeEnd={onResizeEnd}
                onChange={onChange}
            >
                <HostTree ></HostTree>
                <div style={{margin: '5px', flex: 3, display: 'flex', flexFlow: 'column nowrap', height: 'calc(100% - 24px)' }}>
                    {this.props.tree.loading ? (<Skeleton></Skeleton>) : (<HostBreadCrumb
                        setSelected={this.props.setSelected}
                        links={resolveBreadcrumbs(+this.props.local.selected, this.props.tree.tree)} />)
                    }

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
                            <Redirect to={`/objects/table/${this.props.local.settings.rootNode}`}></Redirect>
                        </Route>
                    </Switch>
                </div>
            </SplitPane>
        );
    }
    render0() {
        return (<div style={{ flexDirection: 'row', display: 'flex', height: 'calc(100% - 24px)' }}>
            <div style={{ flex: 2, display: 'flex', flexFlow: 'column nowrap' }}>
                <HostTree ></HostTree>
            </div>
            <div style={{ flex: 3, display: 'flex', flexFlow: 'column nowrap' }}>
                <div style={{ flex: 0, flexFlow: 'row nowrap' }}>
                    {this.props.tree.loading ? (<Skeleton></Skeleton>) : (<HostBreadCrumb
                        setSelected={this.props.setSelected}
                        links={resolveBreadcrumbs(+this.props.local.selected, this.props.tree.tree)} />)
                    }
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
                        <Redirect to={`/objects/table/${this.props.local.settings.rootNode}`}></Redirect>
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
    setSelected: bindActionCreators(local.setSelected, dispatch),
    setExpanded: bindActionCreators(local.setExpanded, dispatch)
});

let HostsBrowserRouted = withRouter(HostsBrowser);
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(HostsBrowserRouted));