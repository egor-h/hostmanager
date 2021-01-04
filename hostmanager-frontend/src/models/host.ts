export interface Host {
    id: number,
    name: string,
    address: string,
    enabled: boolean,
    dir: boolean,
    tags: Tag[],
    protocols: number[],
    chld: Host[]
}

export interface HostFormData {
    name: string,
    address: string,
    enabled: boolean,
    dir: boolean,
    tags: string[],
    protocols: number[],
}

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

export interface RecentHost {
    id: number,
    name: string,
    address: string,
    createdAt: string
}
