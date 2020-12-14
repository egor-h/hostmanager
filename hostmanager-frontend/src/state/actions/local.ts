import { Titlebar } from 'custom-electron-titlebar';
import {
    SET_TITLEBAR,
    SET_EXPANDED
} from '../constants';

export const setTitlebar = (titlebar: Titlebar) => ({
    type: SET_TITLEBAR,
    titlebar: titlebar
});

export const setExpanded = (expanded: string[]) => ({
    type: SET_EXPANDED,
    expanded: expanded
})