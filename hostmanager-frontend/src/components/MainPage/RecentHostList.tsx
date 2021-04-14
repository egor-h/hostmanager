import React from 'react';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ImageIcon from '@material-ui/icons/Image';
import WorkIcon from '@material-ui/icons/Work';
import BeachAccessIcon from '@material-ui/icons/BeachAccess';
import Divider from '@material-ui/core/Divider';
import { RecentHost } from '../../models/host';
import { useHistory } from 'react-router-dom';
import { Grow } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
    },
  }),
);

type ListProps = {
    items: RecentHost[]
}

const timeouts = [300, 450, 500, 550, 600, 650, 700, 750, 800, 900]

export default function InsetDividers(props: ListProps) {
  const classes = useStyles();
  const history = useHistory();

  return (
    <List className={classes.root}>
      {props.items.map((e, idx) => (
        <div key={e.id+''}>
            <Grow in={true} timeout={timeouts[idx]}>
            <ListItem button onClick={() => {history.push(`/objects/info/${e.id}`)}}>
                <ListItemText primary={e.name} secondary={new Date(Date.parse(e.createdAt)).toLocaleString()} />
            </ListItem>
            </Grow>
            <Divider variant="inset" component="li" />
        </div>
      ))}
    </List>
  );
}
