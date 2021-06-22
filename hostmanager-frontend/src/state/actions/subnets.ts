import { Subnet } from "../../models/stat";
import { SUBNETS, SUBNETS_FAILED, SUBNETS_SUCCEDED } from "../constants";

export const subnets = () => ({
    type: SUBNETS
});

export const subnetsFailed = () => ({
    type: SUBNETS_FAILED
});

export const subnetsSucceded = (data: Subnet[]) => ({
    type: SUBNETS_SUCCEDED,
    data: data
});