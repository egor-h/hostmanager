import { AllSubnetsStat } from "../../models/stat";
import { STAT, STAT_FAILED, STAT_SUCCEDED } from "../constants";

const initialState = {
    loading: false,
    data: {errors: [], bySubnet: []},
    error: false
}

export type StatState = {
    loading: boolean;
    data: AllSubnetsStat;
    error: boolean;
}

export const stat = (state = initialState, action: any) => {
    switch(action.type) {
        case STAT:
            return {
                loading: true,
                data: {errors: [], bySubnet: []},
                error: false
            }
        case STAT_SUCCEDED:
            return {
                loading: false,
                data: action.data,
                error: false
            }
        case STAT_FAILED:
            return {
                loading: false,
                data: {errors: [], bySubnet: []},
                error: true
            }
        default:
            return state;
    }
}