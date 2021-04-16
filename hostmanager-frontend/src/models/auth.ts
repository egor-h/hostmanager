import { Settings } from "./settings";

export interface User {
    id: number,
    login: string,
    email: string,
    name: string,
    roles: string[],
}

export interface NewUser extends User {
    password: string;
}

export interface Auth {
    token: string;
    user: User;
    settings: Settings;
}