import { Box, Grid, TextField, Typography } from '@material-ui/core';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Autocomplete } from '@material-ui/lab';

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    margin: {
      margin: theme.spacing(1),
    },

    textField: {
      width: '25ch',
    },
  }));

const OPTS = [
    'first',
    'second',
    'third'
]

type FormProps = {
    title: string,
    id: string
}

const HostDirForm = (props: FormProps) => {
    const classes = useStyles();

    return (
    <Box display="flex" flexWrap="wrap" style={{padding: '20px'}}>
        <Typography variant="h4" component="h4" style={{flexBasis: '100%'}}>{props.title}</Typography>
        <form noValidate autoComplete="off">
            <TextField className={classes.margin} required size="small" id="standard-required" label="Name" defaultValue="" />
            <Autocomplete
                multiple
                id="size-small-outlined-multi"
                size="small"
                options={OPTS}
                getOptionLabel={(option) => option}
                defaultValue={[]}
                renderInput={(params) => (
                    <TextField className={classes.margin} {...params} label="Tags" placeholder="Host tags" />
                )}
            />
        </form>
    </Box>)
    return (<div>this is hostform and id is {props.id}</div>);
}

export default HostDirForm;