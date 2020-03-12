/* 
  后台管理 用户表 路由文件
*/

const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt')

const db = require('../../../../utils/Database')
const Result = require('../../../../utils/Result')
const saltRounds = 10 // 加密盐池

// 分页查询用户表
router.post('/pageSelectUserList', bodyParser.json(), async (req, res, next) => {
  // 1. 接收参数page,size
  let page = req.body.page ? req.body.page : 1
  let size = req.body.size ? req.body.size : 10
  let first = (page - 1) * size
  let second = page * size
  // 2. 查询用户表
  let selectResult = await db.select('*', 'user', false, `LIMIT ${first},${second}`)
  // 3. 根据参数返回相应数据
  res.json(Result.resultHandle(selectResult))
})
// 删除用户
router.post('/deleteUser', bodyParser.json(), async (req, res, next) => {
  // 1. 根据username删除用户
  let uname = req.body.username
  if (uname === undefined) {
    return res.json(Result.jsonResult({}, '参数错误，请传递uname参数', true, [], 2))
  }
  let deleteResult = await db.delete({ username: uname }, 'user')
  return res.json(Result.resultHandle(deleteResult))
})
// 新增或修改用户信息
router.post('/updateUserMes', bodyParser.json(), async (req, res, next) => {
  // 1.接收参数
  let uname = req.body.username
  let pwd = req.body.password
  if (uname === undefined) {
    return res.json(Result.jsonResult({}, '请传递username'), true, [], 2)
  }
  let tempObject = {}
  if (pwd !== undefined) {
    bcrypt.hash(pwd, saltRounds, (err, hash) => {
      tempObject.password = hash
    })
  }
  // 1. 接收username更新信息
  req.body.name ? (tempObject.name = req.body.name) : null
  req.body.sex ? (tempObject.sex = req.body.sex) : null
  req.body.avatarPath ? (tempObject.avatarPath = req.body.avatarPath) : null
  req.body.roleId ? (tempObject.roleId = req.body.roleId) : null
  // 查询是否存在该uname，如果没有则转换成新增操作
  let hasuname = await db.select('username', 'user', { username: uname })
  if (hasuname.length === 0) {
    let insertResult = await db.insert(tempObject, 'user')
    return res.json(Result.resultHandle(insertResult))
  }
  // 2.执行update操作
  let updateResult = await db.update(tempObject, 'user', { username: uname })
  // 3.返回成功或失败
  return res.json(Result.resultHandle(updateResult))
})
module.exports = router
