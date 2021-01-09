import { Host } from "./host";

export interface SubnetStat {
    network: string,
    hosts: number
}

export interface AllSubnetsStat {
    errors: Host[],
    bySubnet: SubnetStat[]
}