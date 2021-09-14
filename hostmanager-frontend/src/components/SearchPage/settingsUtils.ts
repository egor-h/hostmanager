import ruTranslation from '../../translate/ru/translation';
import enTranslation from '../../translate/en/translation';
import { resourceLimits } from 'worker_threads';

const SETTING_KEY_START = "settings_page_"

console.log(ruTranslation);

export const filterSettingsKeys = (lang: string): {[k: string]: string} => {
    let result: {[k: string]: string}  = {}
    let ruSettings = Object.entries(ruTranslation).filter(([key, val]) => key.startsWith(SETTING_KEY_START)).forEach(e => Object.assign(result, {[e[1]]: e[0]}));
    // let enSettings = Object.keys(enTranslation).filter(t => t.startsWith(SETTING_KEY_START))
    return result;
}

export const findSetting = (filteredKeys: object, query: string): string[] => {
    return Object.keys(filteredKeys).filter(k => k.toLowerCase().includes(query.toLowerCase()));
}