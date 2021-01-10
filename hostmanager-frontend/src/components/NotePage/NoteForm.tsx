import { Box, Button, Checkbox, FormControlLabel, TextField, Typography, withStyles } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import React from 'react';
import { FullNote, Host, Note } from '../../models/host';

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

type FormProps = {
    note: FullNote;
    allHosts: {id: number, name: string}[];
    onSubmit: (note: FullNote) => void;
    onDelete?: (noteId: number) => void;
    classes: any;
    showDeleteButton: boolean;
    title: string;
}

type FormState = {
    id: number;
    title: string;
    text: string;
    done: boolean;
    hosts: Host[];
}

class NoteForm extends React.Component<FormProps, FormState> {
    constructor(props: FormProps) {
        super(props);
        let id = -1;
        let title = '';
        let text = '';
        let done = false;
        let hosts: Host[] = [];

        if (this.props.note) {
            id = this.props.note.id;
            title = this.props.note.title;
            text = this.props.note.text;
            done = this.props.note.done;
            hosts = this.props.note.hosts;
        }

        this.state = {
            id: id,
            title: title,
            text: text,
            done: done,
            hosts: hosts
        }

        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleTextChange = this.handleTextChange.bind(this);
        this.handleHostsChange = this.handleHostsChange.bind(this);
        this.handleDoneChange = this.handleDoneChange.bind(this);
        this.handleDeleteButton = this.handleDeleteButton.bind(this);
        this.handleSubmitButton = this.handleSubmitButton.bind(this);
        console.log(this.state);
    }

    handleTitleChange(e: any) {
        let title = e.target.value;
        this.setState(() => ({title}))
    }

    handleTextChange(e: any) {
        let text = e.target.value;
        this.setState(() => ({text}))
    }

    handleHostsChange(e: any, newValue: any[]) {
        let hosts = newValue;
        this.setState(() => ({hosts}))
    }

    handleDoneChange(e: React.ChangeEvent<HTMLInputElement>, checkboxState: boolean) {
        let done = checkboxState;
        this.setState(() => ({ done }));
    }
    handleDeleteButton(e: any) {
        e.preventDefault();
        this.props.onDelete && this.props.onDelete(this.state.id);
    }

    handleSubmitButton(e: any) {
        e.preventDefault();
        this.props.onSubmit(this.state as FullNote)
    }

    render() {
        let {classes} = this.props;
        
        return (<Box display="flex" alignItems="stretch" flexShrink={0} flexWrap="wrap" style={{padding: '20px'}}>
            <Typography variant="h4" component="h4" style={{flexBasis: '100%'}}>{this.props.title}</Typography>
            <form noValidate autoComplete="off" onSubmit={this.handleSubmitButton} >
                <TextField 
                    style={{display: 'flex', width: '50vw', flexBasis: '100%'}} 
                    className={classes.margin} 
                    value={this.state.title} 
                    onChange={this.handleTitleChange} 
                    required 
                    size="small" 
                    id="standard-required" 
                    label="Title" />
                <TextField 
                    multiline
                    rows={3}
                    rowsMax={5}
                    style={{display: 'flex', flexBasis: '100%'}} 
                    className={classes.margin} 
                    value={this.state.text}  
                    onChange={this.handleTextChange} 
                    required 
                    size="small" 
                    id="standard-required" 
                    label="Text" />
                <FormControlLabel
                    control={
                    <Checkbox
                        // value={this.state.enabled}
                        checked={this.state.done}
                        onChange={this.handleDoneChange}
                        name="done"
                        color="primary"
                    />
                    }
                    label="Done"
                />
                <Autocomplete
                    style={{display: 'flex', flexBasis: '100%'}}
                    onChange={this.handleHostsChange}
                    multiple
                    id="size-small-outlined-multi"
                    size="small"
                    options={this.props.allHosts}
                    getOptionLabel={(option) => option.name}
                    defaultValue={this.state.hosts}
                    renderInput={(params) => (
                        <TextField className={classes.margin} {...params} label="Tags" placeholder="Host tags" />
                    )}
                />
                <Button style={{margin: '10px'}} type="submit" variant="contained">Save</Button>
                {this.props.showDeleteButton ? <Button style={{margin: '10px'}} color="secondary" variant="contained" onClick={this.handleDeleteButton}>Delete</Button> : ''}
            </form>
        </Box>)
    }
}

export default withStyles(styles, { withTheme: true})(NoteForm);