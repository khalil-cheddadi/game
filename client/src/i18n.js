// translation files

import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import translationEn from './locales/en/translation.json'

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: translationEn,
    },
  },
  lng: "en",
  fallbackLng: "en",
});

export default i18n;
