import request from '../utils/request'

// 分页查询用户表
export function fetchUserList(query) {
  return request({
    url: '/user/pageSelectUserList',
    method: 'post',
    data: query,
  })
}

// 更新或新增
export function updateUserMes(query) {
  return request({
    url: '/user/updateUserMes',
    method: 'post',
    data: query,
  })
}

// 删除
export function deleteUser(query) {
  return request({
    url: '/user/deleteUser',
    method: 'post',
    data: query,
  })
}
