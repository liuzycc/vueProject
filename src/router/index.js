import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login'

Vue.use(Router)

const router = new Router({
  routes: [
    { path: '/', redirect: '/login' },
    { path: '/login', name: 'Login', component: Login }
  ]
})

// 为路由对象添加导航守卫
router.beforeEach((to, from, next) => {
  // 如果用户访问的是登录页，则直接放行
  if (to.path === '/login') return next()
  const tokenStr = window.sessionStorage.getItem('token')
  // 没有token强制跳转到登录页
  if (!tokenStr) return next('/login')
  next()
})

export default router
