import { ServiceCapabilities, ServiceInfo, ServiceInfoFull } from "../../models/auth"
import { SERVICE_INFO, SERVICE_INFO_FAILED, SERVICE_INFO_SUCCEDED } from "../constants"

const initialState: ServiceInfoType = {
    loading: false,
    data: {
        info: {
            adminEmail: "",
            description: "",
            location: ""
        },
        capabilities: {
            mapping: false,
            serverSideAvailability: false,
            zabbix: false
        }
    },
    error: false
}

export type ServiceInfoType = {
    loading: boolean;
    data: ServiceInfoFull;
    error: boolean;
}

export const serviceInfo = (state = initialState, action: any) => {
    switch (action.type) {
        case SERVICE_INFO:
            return {
                ...state,
                loading: true,
                error: false, 
            };
        case SERVICE_INFO_FAILED:
            return {
                loading: false,
                data: initialState.data,
                error: true
            };
        case SERVICE_INFO_SUCCEDED:
            return {
                loading: false, 
                data: action.data,
                error: false
            }
        default:
            return state;
    }
}