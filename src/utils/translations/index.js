import i18n from "i18next";
import { useTranslation, initReactI18next } from "react-i18next";
import frenchTranslation from "./translation.fr.json";

i18n.use(initReactI18next).init({
    resources: {
        fr: {
            translation: frenchTranslation
        }
    },
    lng: "fr", // if you're using a language detector, do not define the lng option
    fallbackLng: "fr",

    interpolation: {
      escapeValue: false // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
    }
})

export default i18n;