import { Box, Button, TextField, Typography, withStyles } from '@material-ui/core';
import React from 'react';
import { Tag } from '../../models/host';

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
    tag: Tag;
    onSubmit: (tag: Tag) => void;
    onDelete?: (tagId: number) => void;
    classes: any;
    showDeleteButton: boolean;
    title: string;
}

type FormState = {
    id: number;
    name: string;
    color: string;
}

class TagForm extends React.Component<FormProps, FormState> {
    constructor(props: FormProps) {
        super(props);
        let id = -1;
        let name = '';
        let color = '';

        if (this.props.tag) {
            id = this.props.tag.id;
            name = this.props.tag.name;
            color = '';
        }

        this.state = {
            id: id,
            name: name,
            color: color
        }

        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleDeleteButton = this.handleDeleteButton.bind(this);
        this.handleSubmitButton = this.handleSubmitButton.bind(this);
        console.log(this.state);
    }

    handleNameChange(e: any) {
        let name = e.target.value;
        this.setState(() => ({name}))
    }

    handleDeleteButton(e: any) {
        e.preventDefault();
        this.props.onDelete && this.props.onDelete(this.state.id);
    }

    handleSubmitButton(e: any) {
        e.preventDefault();
        this.props.onSubmit(this.state as Tag)
    }

    render() {
        let {classes} = this.props;
        
        return (<Box display="flex" alignItems="stretch" flexShrink={0} flexWrap="wrap" style={{padding: '20px'}}>
            <Typography variant="h4" component="h4" style={{flexBasis: '100%'}}>{this.props.title}</Typography>
            <form noValidate autoComplete="off" onSubmit={this.handleSubmitButton} >
                <TextField 
                    style={{display: 'flex', flexBasis: '100%'}} 
                    className={classes.margin} 
                    value={this.state.name} 
                    onChange={this.handleNameChange} 
                    required 
                    size="small" 
                    id="standard-required" 
                    label="Name" />
                <Button style={{margin: '10px'}} type="submit" variant="contained">Save</Button>
                {this.props.showDeleteButton ? <Button style={{margin: '10px'}} color="secondary" variant="contained" onClick={this.handleDeleteButton}>Delete</Button> : ''}
            </form>
        </Box>)
    }
}

export default withStyles(styles, { withTheme: true})(TagForm);