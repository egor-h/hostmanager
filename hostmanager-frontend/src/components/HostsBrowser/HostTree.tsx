import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from '@material-ui/lab/TreeItem';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { local } from '../../state/actions';
import { Host } from '../../models/host';
import { TreeState } from '../../state/reducers/hostsBrowser';
import { scrollbar } from './styles';

const styles = {
  root: {
    height: 216,
    flexGrow: 1,
    maxWidth: 400
  }  
};

type PropsType = {
  expanded: string[];
  setExpanded: any;
  selected: string;
  setSelected: any;
  tree: TreeState;
}

const buildTreeRecurse = (root: Host) => {
  if (! root.dir || root.chld === null) {
      return (<TreeItem key={root.id+''} nodeId={root.id+''} label={root.name} />);
  }
  return (<TreeItem key={root.id+''} nodeId={root.id+''} label={root.name}>
      {root.chld.filter(innerHost => innerHost.dir)
        .sort((a: Host, b: Host) => a.name.localeCompare(b.name))
        .map(innerHost => buildTreeRecurse(innerHost))}
    </TreeItem>);
}

class ControlledTreeView extends React.Component<PropsType, {}> {
  constructor(props: PropsType) {
    super(props);
    this.setExpanded = this.setExpanded.bind(this);
    this.setSelected = this.setSelected.bind(this);
  }


  setExpanded(event: React.ChangeEvent<{}>, nodeIds: string[]) {
    this.props.setExpanded(nodeIds);
  }

  setSelected(event: React.ChangeEvent<{}>, nodeIds: string) {
    this.props.setSelected(nodeIds);
  }

  componentDidMount() {

  }

  render() {
    const returnTree = (treeState: TreeState):any=> {
      if (treeState.loading) {
        return <TreeItem key="1" nodeId="1" label="Loading.." />
      } else if (treeState.error) {
        return <TreeItem key="1" nodeId="1" label="Error, check console" />
      } else {
        return buildTreeRecurse(treeState.tree);
      }
    }

    return (
      <div style={{overflowY: "auto", height: "95vh"}}>
      <TreeView
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpandIcon={<ChevronRightIcon />}
        expanded={this.props.expanded}
        selected={this.props.selected}
        onNodeToggle={this.setExpanded}
        onNodeSelect={this.setSelected}
      >
        {returnTree(this.props.tree)}
      </TreeView>
      </div>
    );
  }
}

const mapStateToProps = (state: any) => ({
  expanded: state.local.expanded,
  selected: state.local.selected,
  tree: state.hostsBrowser.tree
})

const mapDispatchToProps = (dispatch: any) => ({
  setExpanded: bindActionCreators(local.setExpanded, dispatch),
  setSelected: bindActionCreators(local.setSelected, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ControlledTreeView));
