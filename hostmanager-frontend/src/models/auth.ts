import { serviceInfo } from "../state/actions/serviceInfo";
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

export interface ServiceCapabilities {
    zabbix: boolean;
    serverSideAvailability: boolean;
    mapping: boolean;
}

export interface ServiceInfo {
    adminEmail: string;
    location: string;
    description: string;
}

export interface ServiceInfoFull {
    info: ServiceInfo;
    capabilities: ServiceCapabilities
}

export interface Auth extends ServiceInfoFull {
    token: string;
    user: User;
    settings: Settings;
};