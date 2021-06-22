import { SUBNET_STAT, SUBNET_STAT_FAILED, SUBNET_STAT_SUCCEDED } from "../constants";

export const subnetStats = () => ({
    type: SUBNET_STAT
})

export const subnetStatsSucceded = (data: any) => ({
    type: SUBNET_STAT_SUCCEDED,
    data: data
})

export const subnetStatsFailed = () => ({
    type: SUBNET_STAT_FAILED
})