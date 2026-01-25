import i18next from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import HttpApi from "i18next-http-backend";
import { initReactI18next } from "react-i18next";

import enTranslation from "../locales/en/translation.json";
import esTranslation from "../locales/es/translation.json";
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

i18next
    .use(HttpApi)
    .use(LanguageDetector)
    .use(initReactI18next)
    // init i18next
    // for all options read: https://www.i18next.com/overview/configuration-options
    .init({
        resources: {
            en: { translation: enTranslation },
            es: { translation: esTranslation },
            zh: { translation: enTranslation }, // Fallback to English until translation added
            ru: { translation: enTranslation }, // Fallback to English until translation added
            ht: { translation: enTranslation }, // Fallback to English until translation added
            bn: { translation: enTranslation }, // Fallback to English until translation added
            ko: { translation: enTranslation }, // Fallback to English until translation added
            yi: { translation: enTranslation }, // Fallback to English until translation added
            ar: { translation: enTranslation }, // Fallback to English until translation added
            pl: { translation: plTranslation }
        },
        fallbackLng: "en",
        supportedLngs: Object.keys(supportedLngs),
        debug: import.meta.env.DEV,
        interpolation: {
            escapeValue: false // not needed for react as it escapes by default
        }
    });

export default i18next;
