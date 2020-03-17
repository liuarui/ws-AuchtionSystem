/* 
  拍卖部分路由文件
*/

const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt')

const db = require('../../utils/Database')
const Result = require('../../utils/Result')
// 根据拍品id 获取拍品详情 /api/auction
router.post('/', bodyParser.json(), async (req, res, next) => {
  // 1. 接收参数(aucId)
  let aucId = req.body.aucId
  // 2. 用该参数去查询拍品数据库
  let selectResult = await db.select('aucId,name,price,provider,state,startTime,endTime', 'auction', { aucId: aucId })
  // 3. 返回数据
  res.json(Result.resultHandle(selectResult))
})
// 分页查询拍品表
router.post('/pageSelectAuctionList', bodyParser.json(), async (req, res, next) => {
  // 1. 接收参数page,size
  let page = req.body.page ? req.body.page : 1
  let size = req.body.size ? req.body.size : 10
  let first = (page - 1) * size
  let second = page * size
  // 2. 查询拍品表
  let selectResult = await db.select('aucId,name,price,provider,state,startTime,endTime', 'auction', false, `LIMIT ${first},${second}`)
  // 查询总数
  let count = await db.select('count(aucId,name,price,provider,state,startTime,endTime)', 'auction')
  let total = { pageTotal: count[0]['count(aucId,name,price,provider,state,startTime,endTime)'], page: page, size: size }
  // 3. 根据参数返回相应数据
  res.json(Result.resultHandle(selectResult, total))
})
module.exports = router
