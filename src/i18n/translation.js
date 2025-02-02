// Source: https://lokalise.com/blog/vue-i18n/
import { nextTick } from "vue";
import i18n from "@/i18n"
const { t } = i18n.global;

const Translate = {

  get currentLocale() {
    return i18n.global.locale.value
  },

  set currentLocale(newLocale) {
    i18n.global.locale.value = newLocale
  },

  get supportedLocales() {
    return import.meta.env.VITE_SUPPORTED_LOCALES.split(",")
  },

  get supportedLocaleNames() {
    return import.meta.env.VITE_SUPPORTED_LOCALE_NAMES.split(",")
  },

  isLocaleSupported(locale) {
    return Translate.supportedLocales.includes(locale)
  },

  get defaultLocale() {
    return import.meta.env.VITE_DEFAULT_LOCALE
  },

  getUserLocale() {
    const locale = window.navigator.language ||
      window.navigator.userLanguage ||
      Translate.defaultLocale

    // e.g. 'en-US' vs 'en'
    return {
      locale: locale,
      localeNoRegion: locale.split('-')[0]
    }
  },
  
  getPersistedLocale() {
    const persistedLocale = localStorage.getItem("user-locale");
    if(Translate.isLocaleSupported(persistedLocale)) {
      return persistedLocale
    } else {
      return null
    }
  },

  // Chooses first available and supported option out of:
  //   - persisted value in local storage
  //   - window.navigator.language
  //   - window.navigator.userLanguage
  //   - Translate.defaultLocale
  guessDefaultLocale() {
    const userPersistedLocale = Translate.getPersistedLocale()
    if(userPersistedLocale) {
      return userPersistedLocale
    }

    const userPreferredLocale = Translate.getUserLocale()

    if (Translate.isLocaleSupported(userPreferredLocale.locale)) {
      return userPreferredLocale.locale
    }

    if (Translate.isLocaleSupported(userPreferredLocale.localeNoRegion)) {
      return userPreferredLocale.localeNoRegion
    }

    return Translate.defaultLocale
  },

  switchLanguage(newLocale) {
    Translate.currentLocale = newLocale
    document.querySelector("html").setAttribute("lang", newLocale)
    localStorage.setItem("user-locale", newLocale)
  },


  i18nRoute(to) {
    return {
      ...to,
      params: {
        locale: Translate.currentLocale,
        ...to.params
      }
    }
  },

  parseRoute(routeName) {
    const explicitPattern = /^([\w]+)\.([a-z]{2})$/
    const implicitPattern = /^([\w]+)\.([A-Z]{2})$/

    let match

    // Explicit locale
    if ((match = routeName.match(explicitPattern))) {
      return { type: "explicit", basename: match[1], locale: match[2] }
    }

    // Implicit locale
    else if ((match = routeName.match(implicitPattern))) {
      return { type: "implicit", basename: match[1], locale: match[2].toLowerCase() }
    }

    // Ambiguous locale
    else return { type: "ambiguous", basename: routeName, locale: null }

  },

}

export default Translate
