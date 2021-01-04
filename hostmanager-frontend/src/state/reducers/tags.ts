import { Tag } from "../../models/host";
import { TAGS, TAGS_FAILED, TAGS_SUCCEDED } from "../constants";

const initialState = {
    loading: false,
    data: [],
    error: false
}

export type TagState = {
    loading: boolean;
    data: Tag[];
    error: boolean;
}

export const tags = (state = initialState, action: any) => {
    switch(action.type) {
        case TAGS:
            return {
                loading: true,
                data: [],
                error: false
            }
        case TAGS_SUCCEDED:
            return {
                loading: false,
                data: action.data,
                error: false
            }
        case TAGS_FAILED:
            return {
                loading: false,
                data: [],
                error: true
            }
        default:
            return state;
    }
}