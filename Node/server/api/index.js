/* 
  主路由文件
*/

const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt')

const db = require('../../utils/Database')
const Result = require('../../utils/Result')

// 分页 搜索查询拍品表
router.post('/pageSearchAuction', bodyParser.json(), async (req, res, next) => {
  // 1. 接收参数keyword ，page,size
  let keyword = req.body.keyword ? req.body.keyword : ''
  let page = req.body.page ? req.body.page : 1
  let size = req.body.size ? req.body.size : 10
  let first = (page - 1) * size
  let second = page * size
  // 2. 查询拍品表
  let selectResult = await db.select('aucId,name,price,provider,state,startTime,endTime', 'auction', false, `WHERE name LIKE '%${keyword}%' LIMIT ${first},${second}`)
  let count = await db.select('count(name)', 'auction', false, `WHERE name LIKE '%${keyword}%'`)
  let total = { pageTotal: count[0]['count(name)'], page: page, size: size }
  // 3. 根据参数返回相应数据
  res.json(Result.resultHandle(selectResult, total))
})
module.exports = router
