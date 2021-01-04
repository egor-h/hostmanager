import { Protocol } from "../../models/host";
import { PROTOCOLS, PROTOCOLS_FAILED, PROTOCOLS_SUCCEDED } from "../constants";

export const protocols = () => ({
    type: PROTOCOLS
})

export const protocolsFailed = () => ({
    type: PROTOCOLS_FAILED
})

export const protocolsSucceded = (protocols: Protocol[]) => ({
    type: PROTOCOLS_SUCCEDED,
    protocols: protocols
})