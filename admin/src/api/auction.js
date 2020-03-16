import request from '../utils/request'

// 分页查询拍品表
class Auction {
  fetchAuctionList(query) {
    request({
      url: '/auction/pageSelectAuctionList',
      method: 'post',
      params: query,
    })
  }

  // 更新或新增
  updateAuctionMes(query) {
    request({
      url: '/auction/pageSelectAuctionList',
      method: 'post',
      params: query,
    })
  }

  // 删除
  deleteAuctionMes(query) {
    request({
      url: '/auction/deleteAuctionMes',
      method: 'post',
      params: query,
    })
  }
}

module.exports = new Auction()
