import axios from 'axios'
import store from '../store/index'

const service = axios.create({
  baseURL: 'http://liuarui.top:3000/api/admin',
  timeout: 5000,
})

service.interceptors.request.use(
  config => {
    if (store.state.token) {
      config.headers.authorization = store.state.token
    } else {
      let token = localStorage.getItem('token')

      config.headers.authorization = token
    }

    return config
  },
  error => {
    console.log(error)
    return Promise.reject()
  },
)

service.interceptors.response.use(
  response => {
    if (response.status === 200) {
      return response.data
    }
    // if (response.status === 403 || response.status === 401) {
    //   router.replace({ path: '/login' })
    //   //用户身份过期
    //   return 403
    // }
  },
  error => {
    console.log('请求发生错误', error)
    return Promise.reject()
  },
)

export default service
