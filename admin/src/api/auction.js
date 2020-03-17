import request from '../utils/request'

// 分页查询拍品表
export function fetchAuctionList(query) {
  return request({
    url: '/auction/pageSelectAuctionList',
    method: 'post',
    data: query,
  })
}

// 更新或新增
export function updateAuctionMes(query) {
  return request({
    url: '/auction/updateAuctionMes',
    method: 'post',
    data: query,
  })
}

// 删除
export function deleteAuctionMes(query) {
  return request({
    url: '/auction/deleteAuctionMes',
    method: 'post',
    data: query,
  })
}
