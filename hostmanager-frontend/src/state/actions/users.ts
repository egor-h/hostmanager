import { User } from "../../models/auth";
import { USERS, USERS_FAILED, USERS_SUCCEDED } from "../constants";

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