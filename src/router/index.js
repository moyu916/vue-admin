import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/login/Login.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login',
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('@/views/home/Home.vue'),
    redirect: '/users',
    children: [
      {
        path: '/users',
        name: 'User',
        component: () => import('@/views/home/user/User.vue')
      },
      {
        path: '/rights',
        name: 'Right',
        component: () => import('@/views/home/power/Right.vue')
      },
      {
        path: '/roles',
        name: 'Role',
        component: () => import('@/views/home/power/Role.vue')
      },
      {
        path: '/categories',
        name: 'Category',
        component: () => import('@/views/home/goods/Category.vue')
      },
      {
        path: '/params',
        name: 'Param',
        component: () => import('@/views/home/goods/Param.vue')
      },
      {
        path: '/goods',
        name: 'GoodsList',
        component: () => import('@/views/home/goods/GoodsList.vue')
      },
      {
        path: '/goods/add',
        name: 'GoodsAdd',
        component: () => import('@/views/home/goods/Add.vue')
      },
      {
        path: '/orders',
        name: 'Order',
        component: () => import('@/views/home/order/Order.vue')
      },
      {
        path: '/reports',
        name: 'Report',
        component: () => import('@/views/home/report/Report.vue')
      },

    ]
  }
]


const router = new VueRouter({
  routes
})

// 挂载路由导航守卫
router.beforeEach((to, from, next) => {
  // to 将要访问的路径
  // from 代表从哪个路径跳转而来
  // next 是一个函数，表示放行
  //     next()  放行    next('/login')  强制跳转

  if (to.path === '/login') return next()
  // 获取token
  const tokenStr = window.sessionStorage.getItem('token')
  if (!tokenStr) return next('/login')
  next()
})

export default router
