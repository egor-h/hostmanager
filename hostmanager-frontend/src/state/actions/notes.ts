import { Note } from "../../models/host";
import { NOTES, NOTES_FAILED, NOTES_SUCCEDED } from "../constants";

export const notes = () => ({
    type: NOTES
})

export const notesFailed = () => ({
    type: NOTES_FAILED
})

export const notesSucceded = (notes: Note[]) => ({
    type: NOTES_SUCCEDED,
    notes: notes
})