import { User } from '../models/auth';
import { setSnackbar } from '../state/actions/local';
import { users } from '../state/actions';
import { doDelete, get, post, put } from './basicCrud';

const API_USERS = '/api/v1/users';

export const fetchUsers = () => get<User[]>({
    url: API_USERS,
    actionBeforeFetch: users.users,
    actionOnSuccess: users.usersSucceded,
    actionOnError: users.usersFailed
});