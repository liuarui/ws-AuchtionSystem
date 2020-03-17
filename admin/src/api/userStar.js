import request from '../utils/request'

// 分页查询用户收藏表
export function fetchUserStarList(query) {
  return request({
    url: '/userStar/pageSelectUserStarList',
    method: 'post',
    data: query,
  })
}
// 更新或新增

export function updateUserStarMes(query) {
  return request({
    url: '/userStar/updateUserStarMes',
    method: 'post',
    data: query,
  })
}
// 删除

export function deleteUserStarMes(query) {
  return request({
    url: '/userStar/deleteUserStarMes',
    method: 'post',
    data: query,
  })
}
