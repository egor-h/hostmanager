import { Subnet } from "../../models/stat"
import { SUBNETS, SUBNETS_FAILED, SUBNETS_SUCCEDED } from "../constants"

const initialState: Subnets = {
    loading: false,
    data: [],
    error: false
}

export type Subnets = {
    loading: boolean;
    data: Subnet[];
    error: boolean;
}

export const subnets = (state = initialState, action: any) => {
    switch (action.type) {
        case SUBNETS:
            return {
                loading: true,
                data: [],
                error: false
            }
        case SUBNETS_SUCCEDED:
            return {
                loading: false,
                data: action.data,
                error: false
            }
        case SUBNETS_FAILED:
            return {
                loading: false,
                data: [],
                error: true
            }
        default:
            return state;
    }
}