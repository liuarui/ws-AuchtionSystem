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
  // 登录路由访问拦截
  let token = localStorage.getItem('token')

  console.log(121, to.path)
  // 除登录路由外
  if (to.path === '/login' || to.path === '/403') {
    next()
  }
  if (token) {
    next()
  }
})
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
