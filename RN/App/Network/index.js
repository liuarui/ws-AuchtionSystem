import conifg from '@Config'
import { AsyncStorage } from 'react-native'
// 保存token
let _token = ''

// 将json对象转化为get查询参数
function _buildQuery(obj) {
  const _ = encodeURIComponent

  return Object.keys(obj)
    .map(k => `${_(k)}=${_(obj[k])}`)
    .join('&')
}
// 获取token
async function _getToken() {
  try {
    let token = await AsyncStorage.getItem('token')

    _token = token
    if (token !== null) {
      return token
    }
  } catch (error) {
    return error
  }
}
class Req {
  // 引入api配置 baseUrl
  constructor() {
    this.baseUrl = conifg.baseUrl
    _getToken()
    this.token = _token
  }
  // 请求完成执行函数
  _httpDone(res) {
    if (res.success) {
      return res
    }
    return Promise.reject(res)
  }
  // 请求失败执行函数
  _httpFail(err) {
    return Promise.reject(err)
  }
  // 发起请求函数 ：重写 fetch
  fetch({
    url,
    query,
    data,
    headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      authorization: _token,
    },
    method = 'GET',
  }) {
    url = this.baseUrl + url
    if (query) {
      url += `?${_buildQuery(query)}`
    }
    // 创建 一个param对象传入fetch方法
    const params = {
      url,
      method,
    }

    if (data) {
      params.body = JSON.stringify(data)
    }
    if (headers) {
      params.headers = headers
    }
    // 返回一个 promise对象
    return fetch(url, params)
      .then(resp => (resp.ok ? resp.json().then(this._httpDone) : this._httpFail(resp)))
      .catch(err => Promise.reject(err))
  }

  async get(url, params = {}) {
    await _getToken()
    params.url = params.url || url
    return this.fetch(params)
  }

  async post(url, params = {}) {
    await _getToken()
    params.url = params.url || url
    params.method = 'POST'
    return this.fetch(params)
  }
}

export default new Req()
