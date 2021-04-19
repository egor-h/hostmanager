import { UserWithPassword, User } from '../models/auth';
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

export const fullUser = (id: number) => get<UserWithPassword>({
    url: `${API_USERS}/${id}`,
    actionBeforeFetch: users.user,
    actionOnSuccess: users.userSucceded,
    actionOnError: users.userFailed
})

export const saveUser = (user: UserWithPassword) => put<UserWithPassword>({
    url: `${API_USERS}/${user.id}`,
    data: user,
    onSuccess: (dispatch) => dispatch(setSnackbar({severity: 'success', message: `Saved user ${user.name}`})),
    onError: (dispatch) => dispatch(setSnackbar({severity: 'error', message: `Error while saving ${user.name}`}))
})

export const createUser = (user: UserWithPassword) => post<UserWithPassword>({
    url: API_USERS,
    data: user,
    onSuccess: (dispatch) => dispatch(setSnackbar({severity: 'success', message: `Created user user ${user.name}`})),
    onError: (dispatch) => dispatch(setSnackbar({severity: 'error', message: `Error while creating ${user.name}`}))
})

export const deleteUser = (userId: number) => doDelete({
    url: `${API_USERS}/${userId}`,
    onSuccess: (dispatch) => dispatch(setSnackbar({severity: 'success', message: `Deleted user ${userId}`})),
    onError: (dispatch) => dispatch(setSnackbar({severity: 'error', message: `Error while deleting ${userId}`}))
})
