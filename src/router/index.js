import vue from 'vue'
import VueRouter from 'vue-router'
import login from '@/views/login'
import home from '@/views/home'
import Welcome from '@/views/welcome'
import articals from '@/views/articals'
import assets from '@/views/assets'
import publish from '@/views/publish'
import fans from '@/views/fans'
import comments from '@/views/comments'
import setting from '@/views/setting'
import NotFound from '@/views/404'
import store from '@/store'
vue.use(VueRouter)
var router = new VueRouter({
  routes: [{
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
    children: [{
      path: '',
      name: 'welcome',
      component: Welcome
    },
    {
      path: '/articals',
      name: 'articals',
      component: articals
    },
    {
      path: '/assets',
      name: 'assets',
      component: assets
    },
    {
      path: '/publish',
      name: 'publish',
      component: publish
    },
    {
      path: '/fans',
      name: 'fans',
      component: fans
    },
    {
      path: '/comments',
      name: 'comments',
      component: comments
    },
    {
      path: '/setting',
      name: 'setting',
      component: setting
    }]
  },
  {
    path: '*',
    name: '404',
    component: NotFound
  }
  ]
})
// 加上全局前置导航守卫
router.beforeEach((to, from, next) => {
  // 1,如果是登录路由，方形
  // to.path === '/login' && next()
  // 2， 获取用户信息，没有的话拦截路由 跳转到登录页
  // !store.getUser().token && next('/login')
  // 3，方形
  if (to.path !== '/login' && !store.getUser().token) return next('/login')
  next()
})
export default router
