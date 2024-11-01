import { createI18n } from "vue3-i18n";
import enUS from "@/locales/lang/en-US.json";
import zhCN from "@/locales/lang/zh-CN.json";
import zhTW from "@/locales/lang/zh-TW.json";
import ptPT from "@/locales/lang/pt-PT.json";
import plPL from "@/locales/lang/pl-PL.json";
import frFR from "@/locales/lang/fr-FR.json";
import esES from "@/locales/lang/es-ES.json";
import deDE from "@/locales/lang/de-DE.json";
import arSA from "@/locales/lang/ar-SA.json";
import { useAppConfigStore } from "@/stores";
export const supportLanguages = [
  "en-US",
  "zh-CN",
  "zh-TW",
  "pt-PT",
  "pl-PL",
  "fr-FR",
  "es-ES",
  "de-DE",
  "ar-SA"
];
const localStorageAppConfig = sessionStorage.getItem("appConfig");
let local = "en-US";
if (localStorageAppConfig != null) {
  const localConfig = JSON.parse(localStorageAppConfig);
  local = localConfig.lang || "en-US";
}
const i18n = createI18n({
  legacy: false,
  locale: local, // set locale
  fallbackLocale: "en-US",
  globalInjection: true,
  availableLocales: supportLanguages,
  messages: {
    "en-US": enUS,
    "zh-CN": zhCN,
    "zh-TW": zhTW,
    "pt-PT": ptPT,
    "pl-PL": plPL,
    "fr-FR": frFR,
    "es-ES": esES,
    "de-DE": deDE,
    "ar-SA": arSA
  }
});
// 实例化i18
// const loadedLanguages = ["en-US"]; // our default language that is preloaded

export function setI18nLanguage(lang) {
  i18n.setLocale(lang);
  const appConfig = useAppConfigStore();
  appConfig.changeLang(lang.toString());
  // axios.defaults.headers.common['Accept-Language'] = lang;
  window.document.querySelector("html")?.setAttribute("lang", lang);
  return lang;
}

export function loadLanguageAsync(lang) {
  // If the same language
  return Promise.resolve(setI18nLanguage(lang));

  // If the language was already loaded
  // if (loadedLanguages.includes(lang)) {
  //   return Promise.resolve(setI18nLanguage(lang));
  // }
  // const modules = import.meta.glob("@/locales/lang/*.json", { eager: false });
  // // If the language hasn't been loaded yet
  // return modules[`/src/locales/lang/${lang}.json`]().then(messages => {
  //   // i18n.global.setLocaleMessage(lang, messages.default);
  //   // i18n.setLocaleMessage(lang, messages.default);
  //   loadedLanguages.push(lang);
  //   return setI18nLanguage(lang);
  // });
}

export default i18n;
