import vue from 'vue'
import VueRouter from 'vue-router'
import login from '@/views/login'
vue.use(VueRouter)
var router = new VueRouter({
  routes: [
    {
      // 跳转路由 （编程式导航）
      // this.$router.push({path:'/login'})
      // this.$router.push('/login')
      // 或者 $.router.push({name:'login'})
      path: '/login',
      name: 'login',
      component: login
    }
  ]
})
export default router
