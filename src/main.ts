import './assets/main.css'
import '@/overloads'

import {createApp} from 'vue'
import {createPinia} from 'pinia'

import App from './App.vue'
import router from './router'
import vue3GoogleLogin from 'vue3-google-login'
import piniaPluginPresistedstate from 'pinia-plugin-persistedstate'
import {getCollections} from './api/collections'

const app = createApp(App)

const pinia = createPinia()
pinia.use(piniaPluginPresistedstate)

app.use(pinia)
app.use(router)
app.use(vue3GoogleLogin, {
    //@ts-ignore
    clientId: import.meta.env.VITE_GOOGLE_CLIENT_ID
})

app.mount('#app')
