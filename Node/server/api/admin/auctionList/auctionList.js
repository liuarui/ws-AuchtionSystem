/* 
  后台管理 拍品管理 路由文件
*/

const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt')

const db = require('../../../../utils/Database')
const Result = require('../../../../utils/Result')

// 分页查询拍品表
router.post('/pageSelectAuctionList', bodyParser.json(), async (req, res, next) => {
  // 1. 接收参数page,size
  let page = req.body.page ? req.body.page : 1
  let size = req.body.size ? req.body.size : 10
  let first = (page - 1) * size
  let second = page * size
  // 2. 查询拍品表
  let selectResult = await db.select('*', 'auction', false, `LIMIT ${first},${second}`)
  // 3. 根据参数返回相应数据
  res.json(Result.resultHandle(selectResult))
})

// 更新拍品信息 (新增和更新操作)
router.post('/updateAuctionMes', bodyParser.json(), async (req, res, next) => {
  let aucId = req.body.aucId
  if (aucId === undefined) {
    return res.json(Result.jsonResult({}, '请传递aucId参数'))
  }
  // 1. 接收拍品信息，去更新相应拍品
  let tempObject = {}
  tempObject.aucId = aucId
  req.body.name ? (tempObject.name = req.body.name) : null
  req.body.price ? (tempObject.price = req.body.price) : null
  req.body.provider ? (tempObject.provider = req.body.provider) : null
  req.body.state ? (tempObject.state = req.body.state) : null
  req.body.ownerId ? (tempObject.ownerId = req.body.ownerId) : null
  req.body.startTime ? (tempObject.startTime = req.body.startTime) : null
  req.body.endTime ? (tempObject.endTime = req.body.endTime) : null
  // 查询是否存在该aucId，如果没有则转换成新增操作
  let hasAucId = await db.select('aucId', 'auction', { aucId: aucId })
  if (hasAucId.length === 0) {
    let insertResult = await db.insert(tempObject, 'auction')
    return res.json(Result.resultHandle(insertResult))
  }
  // 2.执行update操作
  let updateResult = await db.update(tempObject, 'auction', { aucId: aucId })
  // 3.返回成功或失败
  return res.json(Result.resultHandle(updateResult))
})
// 删除拍品信息
router.post('/deleteAuctionMes', bodyParser.json(), async (req, res, next) => {
  let aucId = req.body.aucId
  if (aucId === undefined) {
    return res.json(Result.jsonResult({}, '参数错误，请传递aucId参数', true, [], 2))
  }
  let deleteResult = await db.delete({ aucId: aucId }, 'auction')
  return res.json(Result.resultHandle(deleteResult))
})
module.exports = router
