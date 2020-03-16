import request from '../utils/request'

class AuctionOrder {
  // 分页查询拍品订单表
  fetchAuctionOrderList = query => {
    request({
      url: '/auctionOrder/pageSelectAuctionOrderList',
      method: 'post',
      params: query,
    })
  }

  // 更新或新增
  updateAuctionOrderMes = query => {
    request({
      url: '/auctionOrder/updateAuctionOrderMes',
      method: 'post',
      params: query,
    })
  }

  // 删除
  deleteAuctionOrderMes = query => {
    request({
      url: '/auctionOrder/deleteAuctionOrderMes',
      method: 'post',
      params: query,
    })
  }
}

module.exports = new AuctionOrder()
