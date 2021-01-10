import { Button, TextField } from '@material-ui/core';
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { doAuth } from '../api/auth';
import { AppState } from '../state/reducers';
import { AuthState } from '../state/reducers/auth';
import { LocalState, SnackbarData } from '../state/reducers/localState';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import { hideSnackbar, setIntervalId, setSnackbar } from '../state/actions/local';
import AppSnackbar from './AppSnackbar';


type FormState = {
    login: string;
    password: string;
}

type FormProps = {
    performLogin: (login: string, password: string) => void;
    auth: AuthState;
    setSnackBar: (data: SnackbarData) => void;
}

class LoginForm extends React.Component<FormProps, FormState> {
    constructor(props: FormProps) {
        super(props);
        this.state = {
            login: '',
            password: ''
        }
    }

    componentDidMount() {

    }

    render() {
        return (<form onSubmit={(e) => {
            e.preventDefault();
            this.props.performLogin(this.state.login, this.state.password);
        }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                <TextField autoFocus label="Login" value={this.state.login} onChange={(e) => this.setState({login: e.target.value})}></TextField>
                <TextField label="Password" value={this.state.password} onChange={(e) => this.setState({password: e.target.value})} type="password"></TextField>
                <Button variant="contained" color="primary" type="submit" style={{ alignSelf: 'left', margin: '10px' }}>Login</Button>
                <AppSnackbar />
            </div>
        </form>);
    }
}

const mapStateToProps = (state: AppState) => ({
    auth: state.auth
});

const mapDispatchToProps = (dispatch: any) => ({
    performLogin: bindActionCreators(doAuth, dispatch),
    setSnackBar: bindActionCreators(setSnackbar, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);