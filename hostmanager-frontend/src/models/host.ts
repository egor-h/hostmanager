export interface Host {
    id: number,
    name: string,
    address: string,
    dir: boolean,
    tags: string[],
    protocols: number[],
    chld: Host[]
}

export interface Protocol {
    id: number,
    name: string,
    executionLine: string,
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
