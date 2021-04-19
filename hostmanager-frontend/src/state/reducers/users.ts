import { User, UserWithPassword } from "../../models/auth";
import { USER, USERS, USERS_FAILED, USERS_SUCCEDED, USER_FAILED, USER_SUCCEDED } from "../constants";

const initialState = {
    loading: false,
    data: [],
    error: false,
    singleUser: {
        loading: false,
        data: null,
        error: false
    }
}

type SingleUserLoading = {
    loading: true;
    data: null;
    error: false;
}

type SingleUserError = {
    loading: false;
    data: null;
    error: true
}

type SingleUserSuccess = {
    loading: false;
    data: UserWithPassword;
    error: false;
}

export type UserState = {
    loading: boolean;
    data: User[];
    error: boolean;
    singleUser: SingleUserLoading | SingleUserError | SingleUserSuccess;
}

export const users = (state = initialState, action: any) => {
    switch(action.type) {
        case USERS:
            return {
                ...state,
                loading: true,
                data: [],
                error: false
            }
        case USERS_SUCCEDED:
            return {
                ...state,
                loading: false,
                data: action.users,
                error: false
            }
        case USERS_FAILED:
            return {
                ...state,
                loading: true,
                data: [],
                error: true
            }
        case USER:
            return {
                ...state,
                singleUser: {
                    loading: true,
                    data: null, 
                    error: false
                }
            }
        case USER_SUCCEDED:
            return {
                ...state,
                singleUser: {
                    loading: false,
                    data: action.user,
                    error: false
                }
            }
        case USER_FAILED:
            return {
                ...state,
                singleUser: {
                    loading: false,
                    data: null,
                    error: true
                }
            }
        default:
            return state;
    }
}