import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import StarBorder from '@material-ui/icons/StarBorder';
import ReceiptIcon from '@material-ui/icons/Receipt';
import { Host, Protocol, VALIDATE_EXITCODE, VALIDATE_OUTPUT } from '../../models/host';
import { executeProtocolThunk } from '../../util/launcher';
import { useDispatch, useSelector } from 'react-redux';
import { LocalState, ProtocolResult, ProtocolResultMapByProtocolType } from '../../state/reducers/localState';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
    },
    nested: {
      paddingLeft: theme.spacing(4),
    },
  }),
);


type PropsType = {
    protocols: Protocol[];
    host: Host;
}

const item = (protocol: Protocol, host: Host, onClick:(host: Host, protocol: Protocol) => void) => {
    return (<ListItem button key={protocol.id+''} onClick={() => onClick(host, protocol)}>
        <ListItemIcon>
          <ReceiptIcon />
        </ListItemIcon>
        <ListItemText primary={protocol.name} />
      </ListItem>);
}

const coloredItem = (protocol: Protocol, host: Host, colored: boolean, succeded: boolean, onClick:(host: Host, protocol: Protocol) => void) => {
    let coloredStyle = {color: succeded ? "#4caf50" : "#f44336"};
    return (<ListItem button key={protocol.id+''} onClick={() => onClick(host, protocol)}>
        <ListItemIcon>
          <ReceiptIcon style={colored ? coloredStyle : {}} />
        </ListItemIcon>
        <ListItemText primary={protocol.name} />
      </ListItem>);
}

const VALIDATABLE_LAUNCH_TYPES = [VALIDATE_OUTPUT, VALIDATE_EXITCODE];

const shouldBecolored = (protocol: Protocol) => {
  return VALIDATABLE_LAUNCH_TYPES.includes(protocol.launchType);
}

const validateOutput = (output: string, regex: string): boolean => {
  let exp = new RegExp(regex);
  return exp.test(output);
}

const validateExitcode = (receivedExitcode: number, expectedExitcode: number): boolean => {
  return receivedExitcode === expectedExitcode;
}

const validateLaunch = (protocolResultMap: ProtocolResultMapByProtocolType) => {
  if (protocolResultMap[VALIDATE_OUTPUT] !== undefined || protocolResultMap[VALIDATE_EXITCODE] !== undefined) {
    let protocolResultType = Object.keys(protocolResultMap)[0];
    let protocolResult = protocolResultMap[protocolResultType];
    switch(protocolResult.protocol.launchType) {
      case VALIDATE_OUTPUT:
        return (validateOutput(protocolResult.stdout, protocolResult.protocol.validationRegex) 
        || validateOutput(protocolResult.stderr, protocolResult.protocol.validationRegex));
      case VALIDATE_EXITCODE:
        return validateExitcode(protocolResult.exitCode, protocolResult.protocol.expectedExitCode);
      default:
        return false;
    }
  } else {
    return false;
  }
  
}

export default function ProtocolList(props: PropsType) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const protocolResults = useSelector((state: {local: LocalState}) => state.local.protocolResults);

  let protocolsForHost = props.host.protocols.map(p => props.protocols.find(proto => proto.id === p)).filter(p => p !== undefined);
  // let foundResult = protocolResults.find(p => p.hostId === props.host.id);
  let foundResult = protocolResults[props.host.id];
  console.log(foundResult);
  let validationResult = (foundResult === undefined) ? false : validateLaunch(foundResult);

  return (
    <List
      dense={true}
      component="nav"
      aria-labelledby="protocol-list-subheader"
      subheader={
        <ListSubheader component="div" id="protocol-list-subheader">
          Run
        </ListSubheader>
      }
      className={classes.root}
    >
      {protocolsForHost.map(p => {
          if (p === undefined) { // avoid vscode check
            return {};
          }
          if (shouldBecolored(p)) {
            return coloredItem(p, props.host, shouldBecolored(p), validationResult, (host, prot) => {dispatch(executeProtocolThunk(host, prot))})
          }
          return item(p, props.host, (host, prot) => {dispatch(executeProtocolThunk(host, prot))})
        })
      }
      {/* {props.protocols.map(p => item(p, props.host, (host, prot) => {dispatch(executeProtocolThunk(host, prot))}))} */}
    </List>
  );
}
