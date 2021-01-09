import { Box, Button, Checkbox, FormControlLabel, Grid, TextField, Typography } from '@material-ui/core';
import React, { ChangeEvent, FormEvent, SyntheticEvent } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Autocomplete } from '@material-ui/lab';
import { withStyles } from '@material-ui/core/styles';
import { runAtThisOrScheduleAtNextAnimationFrame } from 'custom-electron-titlebar/lib/common/dom';
import { Host, Protocol, Tag } from '../../models/host';

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

type FieldProps = {
    value: string,
    onChange: (e: any) => void
}

type FormProps = {
    title: string,
    tags: Tag[],
    host: Host,
    onSubmit: (host: Host) => void,
    classes: any
}

type FormState = {
    id: number;
    parentId: number;
    name: string;
    address: string;
    enabled: boolean;
    tags: Tag[];
    protocols: number[];
    dir: boolean;
};

class HostForm extends React.Component<FormProps, FormState> {
    constructor(props: FormProps) {
        super(props);

        let id = -1;
        let parentId = -2;
        let name = '';
        let address = '';
        let enabled = true;
        let tags: Tag[] = [];
        let protocols: number[] = [];
        let dir = false;

        if (this.props.host) {
            id = this.props.host.id;
            parentId = this.props.host.parentId;
            name = this.props.host.name;
            address = this.props.host.address;
            enabled = this.props.host.enabled;
            tags = this.props.host.tags;
            protocols = this.props.host.protocols;
            dir = this.props.host.dir;
        }

        this.state = {
            id: id,
            parentId: parentId,
            name: name,
            address: address,
            enabled: enabled,
            tags: tags,
            protocols: protocols,
            dir: dir
        }

        this.handleNameChange = this.handleNameChange.bind(this)
        this.handleTagChange = this.handleTagChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    
    componentDidMount() {

    }

    handleNameChange(e: any) {
        let name = e.target.value;
        this.setState(() => ({name}))
    }


    handleTagChange(e: any, newValue: Tag[]) {
        let tags = newValue;
        this.setState(() => ({tags}))
    }

    handleSubmit(e: any) {
        e.preventDefault();
        this.props.onSubmit({
            id: this.state.id,
            parentId: this.state.parentId,
            name: this.state.name,
            address: this.state.address,
            enabled: this.state.enabled,
            tags: this.state.tags,
            protocols: this.state.protocols,
            dir: this.state.dir,
            chld: []
        })
    }

    render() {
        let {classes} = this.props;
        return (<Box display="flex" alignItems="stretch" flexShrink={0} flexWrap="wrap" style={{padding: '20px'}}>
        <Typography variant="h4" component="h4" style={{flexBasis: '100%'}}>{this.props.title}</Typography>
        <form noValidate autoComplete="off" onSubmit={this.handleSubmit}>
            <TextField style={{display: 'flex', flexBasis: '100%'}} className={classes.margin} value={this.state.name} onChange={this.handleNameChange} required size="small" id="standard-required" label="Name" defaultValue="" />
            <Autocomplete
                style={{display: 'flex', flexBasis: '100%'}}
                onChange={this.handleTagChange}
                multiple
                id="size-small-outlined-multi"
                size="small"
                options={this.props.tags}
                getOptionLabel={(option) => option.name}
                defaultValue={this.state.tags}
                renderInput={(params) => (
                    <TextField className={classes.margin} {...params} label="Tags" placeholder="Host tags" />
                )}
            />
            <Button type="submit" variant="contained">Save</Button>
        </form>
    </Box>)
    }
}


export default withStyles(styles, { withTheme: true})(HostForm);