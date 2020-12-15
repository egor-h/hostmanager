import { Titlebar } from 'custom-electron-titlebar';
import {
    SET_TITLEBAR,
    SET_EXPANDED,
    SET_SELECTED
} from '../constants';

export const setTitlebar = (titlebar: Titlebar) => ({
    type: SET_TITLEBAR,
    titlebar: titlebar
});

export const setExpanded = (expanded: string[]) => ({
    type: SET_EXPANDED,
    expanded: expanded
});

export const setSelected = (selected: string) => ({
    type: SET_SELECTED,
    selected: selected
});