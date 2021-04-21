import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import PersonIcon from '@material-ui/icons/Person';
import AddIcon from '@material-ui/icons/Add';
import Typography from '@material-ui/core/Typography';
import { blue } from '@material-ui/core/colors';
import { Host, Protocol } from '../../models/host';

const useStyles = makeStyles({
  avatar: {
    backgroundColor: blue[100],
    color: blue[600],
  },
});

export interface AvailabilityDialogProps {
  open: boolean;
  protocols: Protocol[];
  hosts: Host[];
  selectedValue: string;
  onProtocolSelected: (protocol: Protocol) => void;
  onClose: (value: string) => void;
}

function AvailabilityDialog(props: AvailabilityDialogProps) {
  const classes = useStyles();
  const { onClose, selectedValue, open } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  return (
    <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
      <DialogTitle id="simple-dialog-title">Check availability</DialogTitle>
      <List>
        {props.protocols.map((protocol, idx) => (
          <ListItem button onClick={() => {props.onProtocolSelected(protocol)}} key={protocol.id+''} autoFocus={idx === 0}>
            <ListItemAvatar>
              <Avatar className={classes.avatar}>
                <PersonIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={protocol.name} />
          </ListItem>
        ))}
      </List>
    </Dialog>
  );
}

export default AvailabilityDialog;
