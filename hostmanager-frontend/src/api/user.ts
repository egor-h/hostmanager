import { User } from '../models/auth';
import { setSnackbar } from '../state/actions/local';
import { users, usersFailed, usersSucceded } from '../state/actions/users';
import { doDelete, get, post, put } from './basicCrud';

const API_USERS = '/api/v1/users';

export const fetchUsers = () => get<User[]>({
    url: API_USERS,
    actionBeforeFetch: users,
    actionOnSuccess: usersSucceded,
    actionOnError: usersFailed
});