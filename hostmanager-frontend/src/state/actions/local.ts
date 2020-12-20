import { Titlebar } from 'custom-electron-titlebar';
import {
    SET_TITLEBAR,
    SET_EXPANDED,
    SET_SELECTED, SET_BROWSER_MODE
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

type BrowserModes = "table" | "edit" | "new";
export const setBrowserMode = (mode: BrowserModes) => ({
    type: SET_BROWSER_MODE,
    mode: mode
})

export const setBrowserTable = () => setBrowserMode("table")
export const setBrowserEdit = () => setBrowserMode("edit")
export const setBrowserNew = () => setBrowserMode("new")