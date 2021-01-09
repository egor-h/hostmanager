export interface User {
    id: number,
    login: string,
    email: string,
    name: string,
    roles: string[],
}

export interface Auth {
    token: string;
    user: User;
}