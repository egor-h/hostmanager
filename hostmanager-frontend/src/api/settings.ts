import { Settings } from "../models/settings";
import { setSnackbar } from "../state/actions/local";
import api from "./base"

const API_SETTINGS = '/api/v1/settings';

export const getUserSettings = () => {}

export const putUserSettings = (settings: Settings) => {
    return (dispatch: any) => {
        api.put(API_SETTINGS, settings)
        .then(res => {
            dispatch(setSnackbar({severity: 'success', message: 'Settings saved!'}));
        })
        .catch(error => {
            console.error(error);
        });
    }
}