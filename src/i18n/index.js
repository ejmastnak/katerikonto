import { createI18n } from "vue-i18n";
import sl from "./locales/sl.json";
import en from "./locales/en.json";

const i18n = createI18n({
  legacy: false,
  locale: import.meta.env.VITE_DEFAULT_LOCALE,
  fallbackLocale: import.meta.env.VITE_FALLBACK_LOCALE,
  messages: {sl, en}
})

export default i18n
