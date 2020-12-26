import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { RecentHost } from '../../models/host';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    width: 275,
    height: 275,
    spacing: '10px'
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});


type RecentHostCardProps = {
  host: RecentHost;
}

export default function RecentHostCardProps(props: RecentHostCardProps) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          Recently added
        </Typography>
        <Typography variant="h5" component="h2">
          {props.host.name}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          {props.host.address}
        </Typography>
        <Typography variant="body2" component="p">
          In dir created at ...
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Goto dir</Button>
      </CardActions>
    </Card>
  );
}
