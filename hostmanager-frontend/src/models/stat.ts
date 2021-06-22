import { Host } from "./host";

export interface SubnetStat {
    network: string,
    hosts: number
}

export interface AllSubnetsStat {
    errors: Host[],
    bySubnet: SubnetStat[]
}

export interface Subnet {
    id: number;
    name: string;
    address: string;
    mask: string;
}

export interface SubnetInterval {
    empty: boolean;
    intervalStart: string;
    intervalEnd: string;
}

export interface NetworkToInterval {
    [addr: string]: SubnetInterval[];
}
