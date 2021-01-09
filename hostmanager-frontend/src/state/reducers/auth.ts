import { User } from "../../models/auth";
import { AUTH, AUTH_FAILED, AUTH_NULL, AUTH_SUCCEDED } from "../constants";

const initialState = {
    loading: false,
    data: null,
    error: false
}

export type AuthState = {
    loading: boolean;
    data: { user: User } | null;
    error: boolean;
}

export const auth = (state = initialState, action: any) => {
    switch (action.type) {
        case AUTH:
            return {
                loading: true,
                data: null,
                error: false
            }
        case AUTH_SUCCEDED:
            return {
                loading: false,
                data: action.data,
                error: false
            }
        case AUTH_FAILED:
            return {
                loading: false,
                data: null,
                error: true
            }
        case AUTH_NULL:
            return {
                loading: false,
                data: null,
                error: false
            }
        default:
            return state;
    }
}