export interface Host {
    id: number,
    name: string,
    address: string,
    dir: boolean,
    chld: Host[]
}

export interface RecentHost {
    id: number,
    name: string,
    address: string,
    createdAt: string
}
