import './assets/main.css'

import { createApp } from 'vue'
import { createVfm } from 'vue-final-modal'

import App from './App.vue'
import router from './router'
import store from "./stores/index"

const app = createApp(App)
const vfm = createVfm()

app.use(store)
app.use(router)
app.use(vfm)

app.mount('#app')
