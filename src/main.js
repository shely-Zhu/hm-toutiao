import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// import router from './router/router'
// @是一个路径的别名  src路径  在vue-cli 项目下有效
// router.js 是目录下的索引文件，默认使用的索引文件
import router from '@/router'
import '@/styles/index.less'
import axios from '@/api'
Vue.config.productionTip = false
Vue.prototype.$http = axios
Vue.use(ElementUI)
new Vue({
  // 是一个vue的配置项 指向的是函数
  // render 的优先级别最高 相比el template
  render: h => h(App),
  router
}).$mount('#app')
