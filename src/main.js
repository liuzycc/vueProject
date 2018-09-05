import Vue from 'vue'
import App from './App'
import router from './router'
// 导入ElementUi
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// 导入全局的样式表
import './assets/css/global.css'
// 导入axios
import axios from 'axios'

// 配置axios
Vue.prototype.$http = axios
axios.defaults.baseURL = 'https://www.liulongbin.top:8888/api/private/v1/'

Vue.use(ElementUI)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
