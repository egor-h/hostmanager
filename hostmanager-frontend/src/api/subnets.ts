import { Subnet } from "../models/stat";
import { subnets } from "../state/actions";
import { setSnackbar } from "../state/actions/local";
import { doDelete, get, post, put } from "./basicCrud";

const URL_SUBNETS = "/api/v1/stats/subnets/manage";

export type SubnetApi = {
    fetchSubnets: typeof fetchSubnets;
    createSubnet: typeof createSubnet;
    saveSubnet: typeof saveSubnet;
    deleteSubnet: typeof deleteSubnet;
}

export const fetchSubnets = () => get<Subnet[]>({
    url: URL_SUBNETS,
    actionBeforeFetch: subnets.subnets,
    actionOnSuccess: subnets.subnetsSucceded,
    actionOnError: subnets.subnetsFailed
});

export const createSubnet = (subnet: Subnet) => post<Subnet>({
    url: URL_SUBNETS,
    data: subnet,
    onSuccess: (dispatch) => {
        dispatch(setSnackbar({severity: "success", message: `Created subnet ${subnet.name}`}))
        dispatch(fetchSubnets)
    },
    onError: (dispatch) => {

    }
});

export const saveSubnet = (subnet: Subnet) => put<Subnet>({
    url: `${URL_SUBNETS}/${subnet.id}`,
    data: subnet,
    onSuccess: (dispatch) => {
        dispatch(setSnackbar({severity: "success", message: `Saved subnet ${subnet.name}`}))
        dispatch(fetchSubnets)
    },
    onError: (dispatch) => {

    }
});

export const deleteSubnet = (subnetId: number) => doDelete({
    url: `${URL_SUBNETS}/${subnetId}`,
    onSuccess: (dispatch) => {
        dispatch(setSnackbar({severity: "success", message: `Deleted subnet`}))
        dispatch(fetchSubnets)
    },
    onError: (dispatch) => {

    }
})