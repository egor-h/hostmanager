import { Auth } from '../models/auth';
import { auth } from '../state/actions';
import { authSucceeded } from '../state/actions/auth';
import { setSnackbar } from '../state/actions/local';
import api from './base';
import { post } from './basicCrud';
import { BASE_URL } from './common';

const API_AUTH = '/auth/login';

export const doAuth = (username: string, password: string) => {
    return (dispatch: any) => {
        dispatch(auth.auth)
        api.post(API_AUTH, {username, password })
        .then(res => {
            if (res.status === 401) {
                dispatch(auth.authFailed());
                dispatch(setSnackbar({severity: 'error', message: 'Wrong login or password'}));
                console.error('Unauthorized: wrong username or password');
                return;
            } else {
                localStorage.setItem("token", res.data.token);
                dispatch(authSucceeded({user: res.data.user}));
            }
        })
        .catch(error => {
            dispatch(setSnackbar({severity: 'error', message: error.message}));
            return Promise.reject(error);
        });
    }
}