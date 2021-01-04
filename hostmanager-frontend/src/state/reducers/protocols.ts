import { Protocol } from "../../models/host"
import { PROTOCOLS, PROTOCOLS_FAILED, PROTOCOLS_SUCCEDED } from "../constants"

const initialState = {
    loading: false,
    data: [],
    error: false
}

export type ProtocolState = {
    loading: boolean;
    data: Protocol[];
    error: boolean;
}

export const protocols = (state = initialState, action: any) => {
    switch(action.type) {
        case PROTOCOLS:
            return {
                loading: true,
                data: [],
                error: false
            }
        case PROTOCOLS_SUCCEDED:
            return {
                loading: false,
                data: action.protocols,
                error: false
            }
        case PROTOCOLS_FAILED:
            return {
                loading: false,
                data: [],
                error: true
            }
        default:
            return state
    }
}