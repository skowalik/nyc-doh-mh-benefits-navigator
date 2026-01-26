import i18next from "i18next";
import { initReactI18next } from "react-i18next";

import enTranslation from "../locales/en/translation.json";
import esTranslation from "../locales/es/translation.json";
import zhTranslation from "../locales/zh/translation.json";
import ruTranslation from "../locales/ru/translation.json";
import htTranslation from "../locales/ht/translation.json";
import bnTranslation from "../locales/bn/translation.json";
import koTranslation from "../locales/ko/translation.json";
import yiTranslation from "../locales/yi/translation.json";
import arTranslation from "../locales/ar/translation.json";
import plTranslation from "../locales/pl/translation.json";

export const supportedLngs: { [key: string]: { name: string; locale: string; nativeName: string } } = {
    en: {
        name: "English",
        locale: "en-US",
        nativeName: "English"
    },
    es: {
        name: "Spanish",
        locale: "es-ES",
        nativeName: "Español"
    },
    zh: {
        name: "Chinese",
        locale: "zh-CN",
        nativeName: "中文"
    },
    ru: {
        name: "Russian",
        locale: "ru-RU",
        nativeName: "Русский"
    },
    ht: {
        name: "Haitian Creole",
        locale: "ht-HT",
        nativeName: "Kreyòl Ayisyen"
    },
    bn: {
        name: "Bengali",
        locale: "bn-BD",
        nativeName: "বাংলা"
    },
    ko: {
        name: "Korean",
        locale: "ko-KR",
        nativeName: "한국어"
    },
    yi: {
        name: "Yiddish",
        locale: "yi",
        nativeName: "ייִדיש"
    },
    ar: {
        name: "Arabic",
        locale: "ar-SA",
        nativeName: "العربية"
    },
    pl: {
        name: "Polish",
        locale: "pl-PL",
        nativeName: "Polski"
    }
};

i18next.use(initReactI18next).init({
    resources: {
        en: { translation: enTranslation },
        es: { translation: esTranslation },
        zh: { translation: zhTranslation },
        ru: { translation: ruTranslation },
        ht: { translation: htTranslation },
        bn: { translation: bnTranslation },
        ko: { translation: koTranslation },
        yi: { translation: yiTranslation },
        ar: { translation: arTranslation },
        pl: { translation: plTranslation }
    },
    lng: "en", // Always default to English
    fallbackLng: "en",
    supportedLngs: Object.keys(supportedLngs),
    debug: import.meta.env.DEV,
    interpolation: {
        escapeValue: false // not needed for react as it escapes by default
    }
});

export default i18next;
