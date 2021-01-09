import { Note, Protocol, Tag } from "./host";

export interface BriefSearchResult {
    hosts: {id: number, name: string, address: string}[],
    notes: Note[],
    protocols: Protocol[],
    tags: Tag[],
}