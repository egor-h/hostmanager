import translationEn from './translate/en/translation';
import translationRu from './translate/ru/translation';

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';


const resources = {
    en: {
        translation: translationEn
    },
    ru: {
        translation: translationRu
    }
}

export default i18n.use(initReactI18next)
    .init({
        resources,
        lng: "ru",
        fallbackLng: "en",
        keySeparator: false,
        interpolation: {
            escapeValue: false
        }
    });