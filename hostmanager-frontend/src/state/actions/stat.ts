import { AllSubnetsStat } from '../../models/stat';
import {
    STAT,
    STAT_FAILED,
    STAT_SUCCEDED
} from '../constants';


export const stat = () => ({
    type: STAT
});

export const statFailed = () => ({
    type: STAT_FAILED
});

export const statSucceeded = (data: AllSubnetsStat) => ({
    type: STAT_SUCCEDED,
    data: data
});
