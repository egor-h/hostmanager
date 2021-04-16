export interface Settings {
    expandTreeOnStartup: boolean,
    rootNode: number
}

export const DEFAULT_SETTINGS = {
    expandTreeOnStartup: false,
    rootNode: 0
}

export type ZabbixGroup = {
    groupId: string;
    name: string;
    internal: string;
}