import axios from 'axios'
import store from '../store/index'

const service = axios.create({
  baseURL: 'https://liuarui.top:8443/api/admin',
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
    // console.log(error)
    Promise.reject(error)
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
    // console.log('请求发生错误',error )
    Promise.reject(error)
  },
)

export default service
