import { User } from "../../models/auth";
import { USERS, USERS_FAILED, USERS_SUCCEDED } from "../constants";

const initialState = {
    loading: false,
    data: [],
    error: false
}

export type UserState = {
    loading: boolean;
    data: User[];
    error: boolean;
}

export const users = (state = initialState, action: any) => {
    switch(action.type) {
        case USERS:
            return {
                loading: true,
                data: [],
                error: false
            }
        case USERS_SUCCEDED:
            return {
                loading: false,
                data: action.users,
                error: false
            }
        case USERS_FAILED:
            return {
                loading: true,
                data: [],
                error: true
            }
        default:
            return state;
    }
}