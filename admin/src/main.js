/* eslint-disable callback-return */
import Vue from 'vue'
import ElementUI from 'element-ui'

import App from './App.vue'
import router from './router/index'
import 'element-ui/lib/theme-chalk/index.css'

Vue.config.productionTip = false

Vue.use(ElementUI, {
  size: 'small',
})
// router.beforeEach((to, from, next) => {
//   document.title = `${to.meta.title} | vue-manage-system`
//   const role = localStorage.getItem('ms_username')

//   if (!role && to.path !== '/login') {
//     next('/login')
//   } else if (to.meta.permission) {
//     // 如果是管理员权限则可进入，这里只是简单的模拟管理员权限而已
//     // eslint-disable-next-line no-unused-expressions
//     role === 'admin' ? next() : next('/403')
//   } else {
//     next()
//   }
// })
new Vue({
  router,
  // store,
  render: h => h(App),
}).$mount('#app')
