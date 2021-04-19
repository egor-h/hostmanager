import { Settings } from "./settings";

export interface User {
    id: number,
    login: string,
    email: string,
    name: string,
    roles: number[],
}

export interface UserWithPassword extends User {
    password: string;
}

export interface Role {
    id: number;
    name: string;
}

export interface Auth {
    token: string;
    user: User;
    settings: Settings;
}