import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import './plugins/element.js'

// 导入全局样式表(为了让背景颜色撑满全屏)
import './assets/css/global.css'
// 导入阿里图标库
import './assets/fonts/iconfont.css'

// import './permission'

// 配置axios
axios.defaults.baseURL = 'http://47.100.175.102:8888/api/private/v1/'

// 需要授权的API（除登录注册接口外），必须在请求头找那个使用Authorization字段提供token令牌
// 请求拦截
axios.interceptors.request.use(config => {
  config.headers.Authorization = localStorage.getItem('token')
  return config
})

// 将axios的原型挂载在vue中，以后进行请求可以直接使用this.$http直接进行数据请求
Vue.prototype.$http = axios

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
