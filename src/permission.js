import router from './router/index'

// 挂载路由导航守卫
router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    next()
  }
  const getToken = localStorage.getItem('token')
  if (!getToken) {
    next('/login')
  }
})
