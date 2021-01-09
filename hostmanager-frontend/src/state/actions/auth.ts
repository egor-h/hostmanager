import { Auth, User } from '../../models/auth';
import {
    AUTH,
    AUTH_FAILED,
    AUTH_SUCCEDED,
    AUTH_NULL
} from '../constants';


export const auth = () => ({
    type: AUTH
});

export const authFailed = () => ({
    type: AUTH_FAILED
});

export const authSucceeded = (auth: {user: User}) => ({
    type: AUTH_SUCCEDED,
    data: auth
});

export const authNull = () => ({
    type: AUTH_NULL
})