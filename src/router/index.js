import vue from 'vue'
import VueRouter from 'vue-router'
import login from '@/views/login'
import home from '@/views/home'
import Welcome from '@/views/welcome'
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
    },
    {
      path: '/',
      component: home,
      children: [
        {
          path: '',
          name: 'welcome',
          component: Welcome
        }
      ]
    }
  ]
})
export default router
