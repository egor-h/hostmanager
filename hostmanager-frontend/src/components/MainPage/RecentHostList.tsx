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

export default function InsetDividers(props: ListProps) {
  const classes = useStyles();

  return (
    <List className={classes.root}>
      {props.items.map(e => (
        <div key={e.id+''}>
            <ListItem>
                <ListItemText primary={e.name} secondary={e.createdAt} />
            </ListItem>
            <Divider variant="inset" component="li" />
        </div>
      ))}
    </List>
  );
}
