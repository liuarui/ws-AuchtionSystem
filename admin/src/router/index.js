import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/dashboard',
    },
    {
      path: '/',
      component: () => import('../components/Home.vue'),
      meta: {
        requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
      },
      children: [
        {
          path: '/dashboard',
          component: () => import('../views/Dashboard.vue'),
          meta: { title: '系统首页', requireAuth: true },
        },
        {
          path: '/auction',
          component: () => import('../views/Auction.vue'),
          meta: { title: '拍品表管理', requireAuth: true },
        },
        {
          path: '/auctionOrder',
          component: () => import('../views/AuctionOrder.vue'),
          meta: { title: '拍品订单表管理', requireAuth: true },
        },
        {
          path: '/user',
          component: () => import('../views/User.vue'),
          meta: { title: '用户表管理', requireAuth: true },
        },
        {
          path: '/userStar',
          component: () => import('../views/UserStar.vue'),
          meta: { title: '用户收藏表管理', requireAuth: true },
        },
        {
          path: '/404',
          component: () => import('../views/404.vue'),
          meta: { title: '404' },
        },
        {
          path: '/403',
          component: () => import('../views/403.vue'),
          meta: { title: '403' },
        },
      ],
    },
    {
      path: '/login',
      component: () => import('../views/Login.vue'),
      meta: { title: '登录' },
    },
    {
      path: '*',
      redirect: '/404',
    },
  ],
})
