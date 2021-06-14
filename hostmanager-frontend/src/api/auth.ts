import { Auth } from '../models/auth';
import { auth } from '../state/actions';
import { authSucceeded } from '../state/actions/auth';
import { setSnackbar, settings } from '../state/actions/local';
import { serviceInfo} from '../state/actions';
import api from './base';
import { post } from './basicCrud';
import { BASE_URL } from './common';

const API_AUTH = '/auth/login';

export const doAuth = (username: string, password: string) => {
    return (dispatch: any) => {
        dispatch(auth.auth());
        dispatch(serviceInfo.serviceInfo())
        api.post(API_AUTH, {username, password })
        .then(res => {
            if (res.status === 401) {
                dispatch(auth.authFailed());
                dispatch(serviceInfo.serviceInfoFailed());
                dispatch(setSnackbar({severity: 'error', message: 'Wrong login or password'}));
                console.error('Unauthorized: wrong username or password');
                return;
            } else {
                localStorage.setItem("token", res.data.token);
                dispatch(authSucceeded({user: res.data.user}));
                dispatch(settings(res.data.settings));
                dispatch(serviceInfo.serviceInfoSucceded({info: res.data.serviceInfo, capabilities: res.data.serviceCapabilities}));
            }
        })
        .catch(error => {
            dispatch(auth.authFailed());
            dispatch(setSnackbar({severity: 'error', message: error.message}));
            return Promise.reject(error);
        });
    }
}