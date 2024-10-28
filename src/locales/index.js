import { createI18n } from "vue3-i18n";
import messages from "@/locales/lang/zh-CN.json";
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
    en: messages
  }
});
// 实例化i18
const loadedLanguages = ["en"]; // our default language that is preloaded

function setI18nLanguage(lang) {
  i18n.locale = lang;
  console.log("i18n", i18n);
  const appConfig = useAppConfigStore();
  appConfig.changeLang(lang.toString());
  // axios.defaults.headers.common['Accept-Language'] = lang;
  window.document.querySelector("html")?.setAttribute("lang", lang);
  return lang;
}

export function loadLanguageAsync(lang) {
  // If the same language
  if (i18n.locale === lang) {
    return Promise.resolve(setI18nLanguage(lang));
  }

  // If the language was already loaded
  if (loadedLanguages.includes(lang)) {
    return Promise.resolve(setI18nLanguage(lang));
  }
  const modules = import.meta.glob("@/locales/lang/*.ts", { eager: false });
  // If the language hasn't been loaded yet
  return modules[`/src/locales/lang/${lang}.ts`]().then(messages => {
    i18n.global.setLocaleMessage(lang, messages.default);
    loadedLanguages.push(lang);
    return setI18nLanguage(lang);
  });
}

export default i18n;
