import { NOTES, NOTES_FAILED, NOTES_SUCCEDED } from "../constants"

const initialState = {
    loading: false,
    data: [],
    error: false
}

export type NoteState = {
    loading: boolean;
    data: [];
    error: boolean;
}

export const notes = (state = initialState, action: any) => {
    switch(action.type) {
        case NOTES:
            return {
                loading: true,
                data: [],
                error: false
            }
        case NOTES_SUCCEDED:
            return {
                loading: false,
                data: action.notes,
                error: false
            }
        case NOTES_FAILED:
            return {
                loading: false,
                data: [],
                error: true
            }
        default:
            return state
    }

}