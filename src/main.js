import { createApp } from 'vue'

import ElementPlus from 'element-plus'
import App from './App.vue'
import router from './router'
import store from './store'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import mBaseUI from 'application-theme-plus'

import 'element-plus/dist/index.css'
import '../../application-theme-plus/theme/element/element.scss'
 
const app = createApp(App)
app.use(mBaseUI)
app.use(ElementPlus, { locale: zhCn }) // 中文
app.use(router)
app.use(store)
app.mount('#app')
