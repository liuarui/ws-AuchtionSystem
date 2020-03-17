/* eslint-disable callback-return */
import Vue from 'vue'
import ElementUI from 'element-ui'

import App from './App.vue'
import router from './router/index'
import store from './store/index'
import 'element-ui/lib/theme-chalk/index.css'

Vue.config.productionTip = false

Vue.use(ElementUI, {
  size: 'small',
})
router.beforeEach((to, from, next) => {
  let token = localStorage.getItem('token')

  if (to.meta.requireAuth) {
    // 判断该路由是否需要登录权限
    if (token) {
      // 通过vuex state获取当前的token是否存在
      next()
    } else {
      next({
        path: '/login',
        query: { redirect: to.fullPath }, // 将跳转的路由path作为参数，登录成功后跳转到该路由
      })
    }
  } else {
    next()
  }
})
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
