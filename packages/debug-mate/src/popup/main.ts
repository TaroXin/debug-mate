import { createPinia } from 'pinia'
import { createPersistedState } from 'pinia-plugin-persistedstate'
import { createApp } from 'vue'
import App from './app.vue'
import router from './router'
import 'virtual:uno.css'
import '../styles/global.scss'
import '@unocss/reset/tailwind-compat.css'

const pinia = createPinia()
const state = createPersistedState({
  storage: localStorage,
})

pinia.use(state)

createApp(App)
  .use(router)
  .use(pinia)
  .mount('#app')
