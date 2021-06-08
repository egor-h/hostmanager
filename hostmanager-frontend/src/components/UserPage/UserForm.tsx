import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { UserWithPassword } from '../../models/auth';
import { AppState } from '../../state/reducers';
import { Box, Button, TextField, Tooltip, Typography, withStyles } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import { WithTranslation, withTranslation } from 'react-i18next';


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

type Props = {
    user: UserWithPassword;
    title: string;
    onSubmit: (user: UserWithPassword) => void;
    showDeleteButton: boolean;
    handleDeleteButton: (user: UserWithPassword) => void;
    classes: any;
} & WithTranslation;

type State = {
    id: number;
    name: string;
    login: string;
    email: string;
    password: string;
    roles: number[];
}

class UserForm extends React.Component<Props, State> {
    constructor(props: any) {
        super(props);
        let id = 0;
        let name = '';
        let login = '';
        let email = '';
        let password = '';
        let roles: number[] = [];

        if (this.props.user) {
            id = this.props.user.id;
            name = this.props.user.name;
            login = this.props.user.login;
            email = this.props.user.email;
            password = this.props.user.password;
            roles = this.props.user.roles;
        };
        console.log("FORM");
        console.log(this.props.user);
        console.log(this.state);

        this.state = {id, name, login, email, password, roles};
        this.handleSubmitButton = this.handleSubmitButton.bind(this);
        this.handleInput = this.handleInput.bind(this);
        this.handleDeleteButton = this.handleDeleteButton.bind(this);
    }

    handleSubmitButton(event: any) {
        event.preventDefault();
        this.props.onSubmit(this.state);
    }

    handleDeleteButton() {
        console.log(this.state);
        this.props.handleDeleteButton(this.state);
    }

    handleInput(event: React.ChangeEvent<HTMLInputElement>) {
        const name = event.target.name;
        const value = event.target.value;
        //@ts-ignore
        this.setState({
            [name]: value
        } );
    }

    render() {
        const { classes, t } = this.props;
        return (<Box display="flex" alignItems="stretch" flexShrink={0} flexWrap="wrap" style={{ padding: '20px' }}>
            <Typography variant="h4" component="h4" style={{ flexBasis: '100%' }}>{this.props.title}</Typography>
            <form noValidate autoComplete="off" onSubmit={this.handleSubmitButton} >
            <TextField
                style={{ display: 'flex', flexBasis: '100%' }}
                className={classes.margin}
                name="name"
                value={this.state.name}
                onChange={this.handleInput}
                required
                size="small"
                id="standard-required"
                label={t("user_page_add_new_user_name_field")} />
            <TextField
                style={{ display: 'flex', flexBasis: '100%' }}
                className={classes.margin}
                name="login"
                value={this.state.login}
                onChange={this.handleInput}
                required
                size="small"
                id="standard-required2"
                label={t("user_page_add_new_user_login_field")} />
            <TextField
                style={{ display: 'flex', flexBasis: '100%' }}
                className={classes.margin}
                name="email"
                value={this.state.email}
                onChange={this.handleInput}
                required
                size="small"
                id="standard-required3"
                label={t("user_page_add_new_user_email_field")} />
            <TextField
                name="password"
                type="password"
                style={{ display: 'flex', flexBasis: '100%' }}
                className={classes.margin}
                value={this.state.password}
                onChange={this.handleInput}
                required
                size="small"
                id="standard-required4"
                label={t("user_page_add_new_user_password_field")} />
            <Button style={{ margin: '10px' }} type="submit" variant="contained">{t("user_page_add_new_user_save_button")}</Button>

            {this.props.showDeleteButton ? 
                <Button style={{ margin: '10px' }} 
                    color="secondary" 
                    variant="contained" 
                    onClick={this.handleDeleteButton}>{t("user_page_add_new_user_delete_button")}
                </Button> : ''}
            </form>
        </Box>);
    }
}

export default withTranslation()(withStyles(styles, {withTheme: true})(UserForm));