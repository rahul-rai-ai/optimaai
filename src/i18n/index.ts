import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import translationEN from './locales/en.json';
import translationDE from './locales/de.json';

const resources = {
  en: { translation: translationEN },
  de: { translation: translationDE },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    detection: {
      order: ['cookie', 'navigator', 'htmlTag', 'path', 'subdomain'],
      caches: ['cookie'],
      cookieMinutes: 525600, // 1 year
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
