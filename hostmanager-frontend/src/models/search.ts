import { Note, Protocol, Tag } from "./host";

export interface BriefHost {
    id: number,
    name: string,
    address: string
}

export interface BriefSearchResult {
    hosts: BriefHost[],
    notes: Note[],
    protocols: Protocol[],
    tags: Tag[],
}