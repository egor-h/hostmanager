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
    protocols: Protocol[],
    host: Host,
    onSubmit: (host: Host) => void,
    classes: any
}

type FormState = {
    id: number;
    parentId: number;
    name: string;
    address: string;
    port: number;
    enabled: boolean;
    tags: Tag[];
    protocols: number[];
    dir: boolean;
};

class HostForm extends React.Component<FormProps, FormState> {
    constructor(props: FormProps) {
        super(props);

        let id = -1;
        let parentId = -1;
        let name = '';
        let address = '';
        let port = 0;
        let enabled = true;
        let tags: Tag[] = [];
        let protocols: number[] = [];
        let dir = false;

        if (this.props.host) {
            id = this.props.host.id;
            parentId = this.props.host.parentId;
            name = this.props.host.name;
            address = this.props.host.address;
            port = this.props.host.port;
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
            port: port,
            enabled: enabled,
            tags: tags,
            protocols: protocols,
            dir: dir
        }

        this.handleNameChange = this.handleNameChange.bind(this)
        this.handleAddressChange = this.handleAddressChange.bind(this)
        this.handlePortChange = this.handlePortChange.bind(this)
        this.handleEnabledChecked = this.handleEnabledChecked.bind(this)
        this.handleTagChange = this.handleTagChange.bind(this)
        this.handleProtocolChange = this.handleProtocolChange.bind(this)
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

    handlePortChange(e: any) {
        let port = e.target.value;
        this.setState(() => ({port}))
    }

    handleTagChange(e: any, newValue: Tag[]) {
        let tags = newValue;
        this.setState(() => ({tags}))
    }

    handleProtocolChange(e: any, newValue: Protocol[]) {
        let protocols = newValue.map(proto => proto.id);
        this.setState(() => ({protocols}));
    }

    handleEnabledChecked(e: React.ChangeEvent<HTMLInputElement>, state: boolean) {
        this.setState(() => ({enabled: state}))
    }

    handleSubmit(e: any) {
        e.preventDefault();
        this.props.onSubmit({
            id: this.state.id,
            parentId: this.state.parentId,
            name: this.state.name,
            address: this.state.address,
            port: this.state.port,
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
            <TextField style={{display: 'flex', width: '50vw', flexBasis: '100%'}} className={classes.margin} value={this.state.name} onChange={this.handleNameChange} required size="small" id="standard-required" label="Name" defaultValue="" />
            <TextField style={{display: 'flex', flexBasis: '100%'}} className={classes.margin} value={this.state.address} onChange={this.handleAddressChange} required size="small" id="standard-required" label="Address" defaultValue="" ></TextField>
            <TextField style={{display: 'flex', flexBasis: '100%'}} className={classes.margin} value={this.state.port} onChange={this.handlePortChange} required size="small" id="standard-required" label="Port" defaultValue="" ></TextField>
            {/* <TextField className={classes.margin} required size="small" id="standard-required" label="Address" defaultValue="" ></TextField>
            <TextField className={classes.margin} required size="small" id="standard-required" label="Address" defaultValue="" ></TextField> */}
            <FormControlLabel
                control={
                <Checkbox
                    // value={this.state.enabled}
                    checked={this.state.enabled}
                    onChange={this.handleEnabledChecked}
                    name="enabled"
                    color="primary"
                />
                }
                label="Enabled"
            />
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
            <Autocomplete
                style={{display: 'flex', flexBasis: '100%'}}
                onChange={this.handleProtocolChange}
                multiple
                id="size-small-outlined-multi"
                size="small"
                options={this.props.protocols}
                getOptionLabel={(option) => option.name}
                defaultValue={this.props.protocols.filter(proto => this.state.protocols.includes(proto.id))}
                renderInput={(params) => (
                    <TextField className={classes.margin} {...params} label="Protocols" placeholder="Host protocols" />
                )}
            />
            <Button type="submit" variant="contained">Save</Button>
        </form>
    </Box>)
    }
}

// const HostForm = (props: FormProps) => {
//     const classes = useStyles();

//     return (
//     <Box display="flex" flexWrap="wrap" style={{padding: '20px'}}>
//         <Typography variant="h4" component="h4" style={{flexBasis: '100%'}}>{props.title}</Typography>
//         <form noValidate autoComplete="off">
//             <TextField value={props.hostState.name.value} onChange={props.hostState.name.onChange} className={classes.margin} required size="small" id="standard-required" label="Name" defaultValue="" />
//             <TextField className={classes.margin} required size="small" id="standard-required" label="Address" defaultValue="" ></TextField>
//             <TextField className={classes.margin} required size="small" id="standard-required" label="Address" defaultValue="" ></TextField>
//             <TextField className={classes.margin} required size="small" id="standard-required" label="Address" defaultValue="" ></TextField>
//             <Autocomplete
//                 multiple
//                 id="size-small-outlined-multi"
//                 size="small"
//                 options={OPTS}
//                 getOptionLabel={(option) => option}
//                 defaultValue={[]}
//                 renderInput={(params) => (
//                     <TextField className={classes.margin} {...params} label="Tags" placeholder="Host tags" />
//                 )}
//             />
//         </form>
//     </Box>)
//     return (<div>this is hostform and id is {props.id}</div>);
// }

export default withStyles(styles, { withTheme: true})(HostForm);