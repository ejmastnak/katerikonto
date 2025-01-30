import { createApp } from 'vue'
import App from './App.vue'

import accounts from '@/assets/json/accounts.json'
import groups from '@/assets/json/groups.json'
import classes from '@/assets/json/classes.json'
import uses from '@/assets/json/uses.json'

const app = createApp(App)

app.provide('accounts', accounts)
app.provide('groups', groups)
app.provide('classes', classes)
app.provide('uses', uses)

app.mount('#app')
