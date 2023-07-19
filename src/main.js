import { createApp } from 'vue'
import './assets/styles/index.scss'
import App from './App.vue'
import router from "./router/index.js";
import pinia from './store/'
import 'virtual:svg-icons-register'
import "element-plus/dist/index.css";
import 'element-plus/theme-chalk/dark/css-vars.css'
import components from "./components/index.js";
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
app.use(router)
app.use(pinia)
// 全局注册组件插件
app.use(components)

app.mount('#app')
