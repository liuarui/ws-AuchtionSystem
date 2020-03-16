import request from '../utils/request'

class UserStar {
  // 分页查询用户收藏表
  fetchUserStarList = query => {
    request({
      url: '/userStar/pageSelectUserStarList',
      method: 'post',
      params: query,
    })
  }

  // 更新或新增
  updateUserStarMes = query => {
    request({
      url: '/userStar/updateUserStarMes',
      method: 'post',
      params: query,
    })
  }

  // 删除
  deleteUserStarMes = query => {
    request({
      url: '/userStar/deleteUserStarMes',
      method: 'post',
      params: query,
    })
  }
}

module.exports = new UserStar()
