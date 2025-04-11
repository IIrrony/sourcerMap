import './assets/main.css'
import ErrorStackParser from 'error-stack-parser'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import { findCodeBySourceMap } from './utils'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.config.errorHandler = (err, vm) => {
  // Handle error
  const errorStack = ErrorStackParser.parse(err as Error)
  findCodeBySourceMap(errorStack[0])
  console.error('Error stack:', errorStack)
  // console.error('Error:', err)
  // console.error('Component:', vm)
}

app.mount('#app')
