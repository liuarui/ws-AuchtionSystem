/* 
  后台管理 拍品订单管理 路由文件
*/

const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt')

const db = require('../../../../utils/Database')
const Result = require('../../../../utils/Result')

// 分页查询拍品订单表
router.post('/pageSelectAuctionOrderList', bodyParser.json(), async (req, res, next) => {
  // 1. 接收参数page,size
  let page = req.body.page ? req.body.page : 1
  let size = req.body.size ? req.body.size : 10
  let first = (page - 1) * size
  let second = page * size
  // 2. 查询拍品表
  let selectResult = await db.select('*', 'auctionOrder', false, `LIMIT ${first},${second}`)
  // 3. 根据参数返回相应数据
  res.json(Result.resultHandle(selectResult))
})

// 更新拍品订单信息 (新增和更新操作)
router.post('/updateAuctionOrderMes', bodyParser.json(), async (req, res, next) => {
  let orderId = req.body.id
  if (orderId === undefined) {
    return res.json(Result.jsonResult({}, '请传递id参数'))
  }
  // 1. 接收拍品订单信息，去更新相应拍品订单
  let tempObject = {}
  req.body.aucId ? (tempObject.aucId = req.body.aucId) : null
  req.body.userId ? (tempObject.userId = req.body.userId) : null
  req.body.state ? (tempObject.state = req.body.state) : null
  // 查询是否存在该aucId，如果没有则转换成新增操作
  let hasorderId = await db.select('id', 'auctionOrder', { id: orderId })
  if (hasorderId.length === 0) {
    let insertResult = await db.insert(tempObject, 'auctionOrder')
    return res.json(Result.resultHandle(insertResult))
  }
  // 2.执行update操作
  let updateResult = await db.update(tempObject, 'auctionOrder', { id: orderId })
  // 3.返回成功或失败
  return res.json(Result.resultHandle(updateResult))
})
// 删除拍品订单信息
router.post('/deleteAuctionOrderMes', bodyParser.json(), async (req, res, next) => {
  let orderId = req.body.id
  if (orderId === undefined) {
    return res.json(Result.jsonResult({}, '参数错误，请传递id参数', true, [], 2))
  }
  let deleteResult = await db.delete({ id: orderId }, 'auctionOrder')
  return res.json(Result.resultHandle(deleteResult))
})
module.exports = router
