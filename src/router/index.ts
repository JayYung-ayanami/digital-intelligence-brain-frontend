import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/login/index.vue'),
    },
    {
      path: '/',
      name: 'layout',
      component: () => import('../layout/index.vue'),
      redirect: '/dashboard',
      children: [
        {
          path: 'dashboard',
          name: 'dashboard',
          component: () => import('../views/dashboard/index.vue'),
          meta: { title: '销售看板' },
        },
      ],
    },
  ],
})

// 全局路由守卫（鉴权校验）
router.beforeEach((to, _from, next) => {
  const token = localStorage.getItem('token')

  // 如果访问的是登录页，直接放行
  if (to.path === '/login') {
    next()
    return
  }

  // 如果没有 token，且访问的不是登录页，强制跳转到登录页
  if (!token) {
    next('/login')
  } else {
    // 已经登录了，直接放行
    next()
  }
})

export default router
