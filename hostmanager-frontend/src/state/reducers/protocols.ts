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


export const PORT_CHECK_LOCAL_ID = -1
export const PORT_CHECK_REMOTE_ID = -2

export const internal: Protocol[] = [
    {
        id: PORT_CHECK_LOCAL_ID,
        name: "Port check",
        executionLine: "",
        validationRegex: "",
        expectedExitCode: 0,
        launchType: "INTERNAL"
    },
    {
        id: PORT_CHECK_REMOTE_ID,
        name: "Port check (remote)",
        executionLine: "",
        validationRegex: "",
        expectedExitCode: 0,
        launchType: "INTERNAL"
    }
]

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
                data: [...internal, ...action.protocols],
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