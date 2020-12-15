import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from '@material-ui/lab/TreeItem';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { local } from '../../state/actions';

const styles = {
  root: {
    height: 216,
    flexGrow: 1,
    maxWidth: 400,
  },
};

type PropsType = {
  expanded: string[];
  setExpanded: any;
  selected: string;
  setSelected: any;
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

  render() {
    return (
      <TreeView
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpandIcon={<ChevronRightIcon />}
        expanded={this.props.expanded}
        selected={this.props.selected}
        onNodeToggle={this.setExpanded}
        onNodeSelect={this.setSelected}
      >
        <TreeItem nodeId="1" label="Applications">
          <TreeItem nodeId="2" label="Calendar" />
          <TreeItem nodeId="3" label="Chrome" />
          <TreeItem nodeId="4" label="Webstorm" />
        </TreeItem>
        <TreeItem nodeId="5" label="Documents">
          <TreeItem nodeId="6" label="Material-UI">
            <TreeItem nodeId="7" label="src">
              <TreeItem nodeId="8" label="index.js" />
              <TreeItem nodeId="9" label="tree-view.js" />
            </TreeItem>
          </TreeItem>
        </TreeItem>
      </TreeView>
    );
  }
}

const mapStateToProps = (state: any) => ({
  expanded: state.local.expanded,
  selected: state.local.selected
})

const mapDispatchToProps = (dispatch: any) => ({
  setExpanded: bindActionCreators(local.setExpanded, dispatch),
  setSelected: bindActionCreators(local.setSelected, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ControlledTreeView));

