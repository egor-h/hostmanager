import { RecentHost } from "../../models/host";
import { HOMEPAGE, HOMEPAGE_FAILED, HOMEPAGE_SUCCEEDED } from "../constants";

export type HomeState = {
    loading: boolean;
    data: {
        recents: RecentHost[],
        hostsTotal: number;
    }
    error: boolean
}

const initialState = {
    loading: false,
    data: { recents: [], hostsTotal: 0 },
    error: false
};

export const home = (state = initialState, action: any) => {
    switch (action.type) {
        case HOMEPAGE:
            return {
                ...state,
                loading: true,
                data: [],
                error: false
            }
        case HOMEPAGE_SUCCEEDED:
            return {
                ...state,
                loading: false,
                data: action.recents,
                error: false

            };
        case HOMEPAGE_FAILED:
            return {
                loading: false,
                data: [],
                error: true
            }
        default:
            return state;
    }
};
