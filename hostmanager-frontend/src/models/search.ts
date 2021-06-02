import { Note, Protocol, Tag } from "./host";

export interface BriefHost {
    id: number,
    name: string,
    address: string
}

export interface FullSearchResult {
    page: number,
    hosts: BriefHost[]
}

export interface BriefSearchResult {
    hosts: BriefHost[],
    notes: Note[],
    protocols: Protocol[],
    tags: Tag[],
}