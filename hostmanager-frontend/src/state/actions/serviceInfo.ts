import { ServiceInfoFull } from "../../models/auth";
import { SERVICE_INFO, SERVICE_INFO_FAILED, SERVICE_INFO_SUCCEDED } from "../constants";

export const serviceInfo = () => ({
    type: SERVICE_INFO
});

export const serviceInfoFailed = () => ({
    type: SERVICE_INFO_FAILED
})

export const serviceInfoSucceded = (serviceInfo: ServiceInfoFull) => ({
    type: SERVICE_INFO_SUCCEDED,
    data: serviceInfo
})