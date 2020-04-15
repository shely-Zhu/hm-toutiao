// 将 axios 进行配置 将配置好的axios导出
import axios from 'axios'
import store from '@/store'
// 基准路径配置
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0/'
// 自定义请求头配置
// axios.defaults.headers = { Authorization: `Bearer ${store.getUser().token}` }
axios.interceptors.request.use(function (config) {
  config.headers = {
    Authorization: `Bearer ${store.getUser().token}`
  }
  return config
}, function (err) {
  return Promise.reject(err)
})
axios.interceptors.response.use(function (res) {
  return res
}, function (err) {
  if (err.response.status === 401) {
    location.hash = '#/login'
  }
  return Promise.reject(err)
})
export default axios
