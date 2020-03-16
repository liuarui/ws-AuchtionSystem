import request from '../utils/request'

export function login(data) {
  return request({
    method: 'post',
    url: '/login',
    data: data,
  })
}

export function logout() {
  request({
    method: 'get',
    url: '/logout',
  })
}
