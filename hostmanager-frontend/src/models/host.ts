export interface Host {
    id: number,
    parentId: number,
    name: string,
    address: string,
    enabled: boolean,
    dir: boolean,
    tags: Tag[],
    protocols: number[],
    chld: Host[]
}

export const EMPTY_HOST = {
    id: -1,
    parentId: -2,
    name: '',
    address: '',
    enabled: true,
    dir: false,
    tags: [],
    protocols: [],
    chld: []
}

export interface HostFormData {
    name: string,
    address: string,
    enabled: boolean,
    dir: boolean,
    tags: string[],
    protocols: number[],
}

export const JUST_RUN = "JUST_RUN";
export const VALIDATE_EXITCODE = "VALIDATE_EXITCODE";
export const VALIDATE_OUTPUT = "VALIDATE_OUTPUT";
export const PRINT_OUTPUT = "PRINT_OUTPUT";
export const INTERNAL = "INTERNAL"

export interface Protocol {
    id: number,
    name: string,
    executionLine: string,
    validationRegex: string,
    expectedExitCode: number,
    launchType: "JUST_RUN" | "VALIDATE_EXITCODE" | "VALIDATE_OUTPUT" | "PRINT_OUTPUT" | "INTERNAL"
}

export interface Tag {
    id: number,
    name: string
}

export interface Note {
    id: number,
    title: string
}

export interface FullNote {
    id: number,
    title: string,
    text: string,
    done: boolean,
    hosts: Host[]
}

export interface RecentHost {
    id: number,
    name: string,
    address: string,
    createdAt: string
}
