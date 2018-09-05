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

// 为axios的请求拦截器 添加处理函数
// 今后只要使用axios发起了ajax请求 必然会先调用 通过拦截器指定的回调函数
axios.interceptors.request.use(config => {
  // config 就是当前请求的相关参数
  console.log('调用了请求拦截器')
  // 添加自定义请求头  添加token验证
  config.headers.Authorization = window.sessionStorage.getItem('token')
  console.log(config)
  return config
})

axios.interceptors.response.use(config => {
  // 调用了响应拦截器
  console.log(config)
  return config
})

Vue.use(ElementUI)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
