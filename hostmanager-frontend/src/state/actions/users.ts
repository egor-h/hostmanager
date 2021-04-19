import { User } from "../../models/auth";
import { USER, USERS, USERS_FAILED, USERS_SUCCEDED, USER_FAILED, USER_SUCCEDED } from "../constants";

export const users = () => ({
    type: USERS
})

export const usersSucceded = (users: User) => ({
    type: USERS_SUCCEDED,
    users: users
})

export const usersFailed = () => ({
    type: USERS_FAILED
})

export const user = () => ({
    type: USER
})

export const userSucceded = (user: User) => ({
    type: USER_SUCCEDED,
    user: user
})

export const userFailed = () => ({
    type: USER_FAILED
})