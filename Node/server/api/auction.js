/* 
  拍卖部分路由文件
*/

const express = require('express')
const router = express.Router()

// 根据拍品id 获取拍品详情
router.post('/', (req, res, next) => {
  // 1. 接收参数(aucId)
  // 2. 用该参数去查询拍品数据库
  // 3. 返回数据
  res.send('根据拍品id 获取拍品详情息')
})
// 查询拍品表
router.post('/getAuction', (req, res, next) => {
  // 1. 接收参数(type，已上架，拍卖成功，流拍)
  // 2. 查询拍品表
  // 3. 根据参数返回相应数据
  res.send('根据type查询拍品')
})
module.exports = router
