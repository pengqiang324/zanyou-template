import { createApp } from 'vue'

import ElementPlus from 'element-plus'
import App from './App.vue'
import router from './router'
import store from './store'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import config from './config/defaultSettings'
import mBaseUI from 'application-theme-plus'
import PostMessage from 'application-message-plus'
import { hasBtnPermission } from './utils/permission' // 权限控制

import 'element-plus/dist/index.css'
import 'application-theme-plus/lib/theme-plus.css'
 
const app = createApp(App)
app.config.globalProperties.hasPerm = hasBtnPermission
app.use(mBaseUI)
app.use(PostMessage, config.whiteOrigin)
app.use(ElementPlus, { locale: zhCn }) // 中文
app.use(router)
app.use(store)
app.mount('#app')
