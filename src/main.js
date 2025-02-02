import { createApp } from 'vue'
import i18n from './i18n'
import Translate from "@/i18n/translation"
import App from './App.vue'

import accounts from '@/assets/json/accounts.json'
import groups from '@/assets/json/groups.json'
import groupsArray from '@/assets/json/groups-array.json'
import classes from '@/assets/json/classes.json'
import classesArray from '@/assets/json/classes-array.json'
import uses from '@/assets/json/uses.json'

const toLocale = Translate.guessDefaultLocale()
if (Translate.currentLocale !== toLocale) Translate.switchLanguage(toLocale)

const app = createApp(App)

app.provide('locale', i18n.global.locale)
app.provide('locales', { en: 'en', sl: 'sl', })
app.provide('accounts', accounts)
app.provide('groups', groups)
app.provide('groupsArray', groupsArray)
app.provide('classes', classes)
app.provide('classesArray', classesArray)
app.provide('uses', uses)

app.use(i18n)
app.mount('#app')
