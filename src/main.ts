import './assets/main.css'
import ErrorStackParser from 'error-stack-parser'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import 'element-plus/theme-chalk/index.css'
import ElementPlus from 'element-plus'

import App from './App.vue'
import router from './router'

// import { findCodeBySourceMap } from './utils'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(ElementPlus)

app.config.errorHandler = (err: any, vm) => {
  // Handle error
  const errorStack = ErrorStackParser.parse(err as Error)
  const jsError = {
    stack_frames: errorStack,
    message: err.message,
    stack: err.stack,
    err_name: err.name,
  }
  vm!.$message.error(`你触发了一个错误：${err.name}`)
  localStorage.setItem('jsErrorList', JSON.stringify(jsError))
  // findCodeBySourceMap(errorStack[0])
  // console.error('Error stack:', errorStack)
  // console.error('Error:', err)
  // console.error('Component:', vm)
}

app.mount('#app')
