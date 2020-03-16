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

  // 如果已经登录，那我不干涉你，让你随便访问
  if (token) {
    next()
  }
})
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
