import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en_LogInPage from "./locales/en/loginPage.json"
import en_MainPage from "./locales/en/mainPage.json"
import en_CommonPages from "./locales/en/commonPages.json"

i18n
    .use(initReactI18next)
    .init({
        debug:true,
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false,
        },
        ns: ['loginPage', 'mainPage', 'commonPages'],
        defaultNS: 'loginPage',

        resources: {
            en: {
                loginPage: en_LogInPage.en,
                mainPage: en_MainPage.en,
                commonPages: en_CommonPages.en
            }
        }
    }
    );

    export default i18n;