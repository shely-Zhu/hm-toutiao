// 将 axios 进行配置 将配置好的axios导出
import axios from 'axios'
import store from '@/store'
import JSONbig from 'json-bigint'
// 基准路径配置
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0/'
axios.defaults.transformResponse = [(data) => {
  // 对data进行转换 data是原始的json数据
  // data 在删除接口返回的是 null 使用JSONbig转换null会报错
  try {
    return JSONbig.parse(data)
  } catch (err) {
    return data
  }
}]
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
