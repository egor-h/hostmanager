import { NetworkToInterval } from "../../models/stat"
import { SUBNET_STAT, SUBNET_STAT_FAILED, SUBNET_STAT_SUCCEDED } from "../constants"

const initialState: SubnetStats = {
    loading: false,
    data: {},
    error: false
}

export type SubnetStats = {
    loading: boolean;
    data: NetworkToInterval;
    error: boolean;
}

export const subnetStats = (state = initialState, action: any) => {
    switch(action.type) {
        case SUBNET_STAT:
            return {
                loading: true,
                data: {},
                error: false
            }
        case SUBNET_STAT_SUCCEDED:
            return {
                loading: false,
                data: action.data,
                error: false
            }
        case SUBNET_STAT_FAILED:
            return {
                loading: false,
                data: {},
                error: true
            }
        default:
            return state;
    }
}