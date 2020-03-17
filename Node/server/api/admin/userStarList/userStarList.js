/* 
  后台管理 用户收藏表 路由文件
*/

const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')

const db = require('../../../../utils/Database')
const Result = require('../../../../utils/Result')

// 分页查询用户收藏信息
router.post('/pageSelectUserStarList', bodyParser.json(), async (req, res, next) => {
  // 1. 接收参数page,size
  let page = req.body.page ? req.body.page : 1
  let size = req.body.size ? req.body.size : 10
  let first = (page - 1) * size
  let second = page * size
  // 2. 查询用户收藏信息
  let selectResult = await db.select('*', 'userStar', false, `LIMIT ${first},${second}`)
  // 查询总数
  let count = await db.select('count(*)', 'userStar')
  let total = { pageTotal: count[0]['count(*)'], page: page, size: size }
  // 3. 根据参数返回相应数据
  res.json(Result.resultHandle(selectResult, total))
})

// 更新用户收藏信息 (新增和更新操作)
router.post('/updateUserStarMes', bodyParser.json(), async (req, res, next) => {
  let id = req.body.id
  if (id === undefined) {
    return res.json(Result.jsonResult({}, '请传递id参数'))
  }
  // 1. 接收拍品信息，去更新相应拍品
  let tempObject = {}
  req.body.aucId ? (tempObject.aucId = req.body.aucId) : null
  req.body.userId ? (tempObject.userId = req.body.userId) : null
  // 查询是否存在该id，如果没有则转换成新增操作
  let hasAucId = await db.select('id', 'userStar', { id: id })
  if (hasAucId.length === 0) {
    let insertResult = await db.insert(tempObject, 'userStar')
    return res.json(Result.resultHandle(insertResult))
  }
  // 2.执行update操作
  let updateResult = await db.update(tempObject, 'userStar', { id: id })
  // 3.返回成功或失败
  return res.json(Result.resultHandle(updateResult))
})
// 删除用户收藏信息
router.post('/deleteUserStarMes', bodyParser.json(), async (req, res, next) => {
  let id = req.body.id
  if (id === undefined) {
    return res.json(Result.jsonResult({}, '参数错误，请传递id参数', true, [], 2))
  }
  let deleteResult = await db.delete({ id: id }, 'userStar')
  return res.json(Result.resultHandle(deleteResult))
})
module.exports = router
