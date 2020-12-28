import { Box, Grid, TextField, Typography } from '@material-ui/core';
import React, { ChangeEvent, FormEvent, SyntheticEvent } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Autocomplete } from '@material-ui/lab';
import { withStyles } from '@material-ui/core/styles';
import { runAtThisOrScheduleAtNextAnimationFrame } from 'custom-electron-titlebar/lib/common/dom';
import { Host } from '../../models/host';

const styles = (theme: any) => ({
    // root: {
    //   display: 'flex',
    //   flexWrap: 'wrap'
    // },
    margin: {
      margin: theme.spacing(1),
    },

    textField: {
      width: '25ch'
    }
  });

const OPTS = [
    'first',
    'second',
    'third'
]

type FieldProps = {
    value: string,
    onChange: (e: any) => void
}

type FormProps = {
    title: string,
    host: Host,
    onSubmit: (host: Host) => void,
    classes: any
}

type FormState = {
    id: number;
    name: string;
    address: string;
    dir: boolean;
};

class HostForm extends React.Component<FormProps, FormState> {
    constructor(props: FormProps) {
        super(props);

        let id = -1;
        let name = '';
        let address = '';
        let dir = false;

        if (this.props.host) {
            id = this.props.host.id;
            name = this.props.host.name;
            address = this.props.host.address;
            dir = this.props.host.dir;
        }

        this.state = {
            id: id,
            name: name,
            address: address,
            dir: dir
        }

        this.handleNameChange = this.handleNameChange.bind(this)
        this.handleAddressChange = this.handleAddressChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    
    componentDidMount() {

    }

    handleNameChange(e: any) {
        let name = e.target.value;
        this.setState(() => ({name}))
    }

    handleAddressChange(e: any) {
        let address = e.target.value;
        this.setState(() => ({address}))
    }

    handleSubmit(e: any) {
        console.log(`Pressed submit`);
        this.props.onSubmit({
            id: this.state.id,
            name: this.state.name,
            address: this.state.address,
            dir: this.state.dir,
            chld: []
        })
    }

    render() {
        let {classes} = this.props;
        return (<Box display="flex" flexWrap="wrap" style={{padding: '20px'}}>
        <Typography variant="h4" component="h4" style={{flexBasis: '100%'}}>{this.props.title}</Typography>
        <form noValidate autoComplete="off" onSubmit={this.handleSubmit}>
            <TextField className={classes.margin} value={this.state.name} onChange={this.handleNameChange} required size="small" id="standard-required" label="Name" defaultValue="" />
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
            <button type="submit"></button>
        </form>
    </Box>)
    }
}

export default withStyles(styles, { withTheme: true})(HostForm);