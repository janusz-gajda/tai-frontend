import './assets/main.css'
import '@/overloads'

import {createApp} from 'vue'
import {createPinia} from 'pinia'

import App from './App.vue'
import router from './router'
import { get } from './api/base'
import {loginGoogle} from './api/auth'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
