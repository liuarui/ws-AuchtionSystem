/* 
  用户路由文件
*/

const express = require('express')
// const bodyParser = require('body-parser')
const router = express.Router()
const db = require('../../config/db')

// const jsonParser = bodyParser.json() // 解析json格式
// 注册
router.post('/register', (req, res, next) => {
  // 1.先检查数据库是否含有该用户名
  // 2.如果有则返回用户名已注册，注册失败
  // 3.如果没有则将数据插入数据库
  // 4.返回注册成功信息
  res.send('注册')
})
// 登陆
router.post('/login', (req, res, next) => {
  // 1. 接收参数，在数据库查询是否符合
  // 2. 如果符合则返回登陆成功+token
  // 3. 不成功返回登陆失败
  res.send('登陆')
})
// 登出
router.all('/logout', (req, res, next) => {
  // 1. 清除session
  // 2. 返回注销成功
  res.send('登出')
})
// 获取用户信息
router.post('/getUserMes', (req, res, next) => {
  // 1. 根据用户id去数据库查询用户信息
  res.send('获取用户信息')
})
// 修改用户信息
router.post('/updateUserMes', (req, res, next) => {
  // 1.接收参数
  // 2.执行update操作
  // 3.返回成功或失败
  res.send('修改用户信息')
})
// 获取用户订单消息
router.post('/getUserOrder', (req, res, next) => {
  // 1. 接收参数（需要type：成功，失败，竞拍中）
  // 2. 查询用户拍卖订单表
  // 3. 根据type返回相应类型的订单
  res.send('获取用户订单消息')
})
///////////////// 收藏部分 ////////////////
// 根据拍品id 收藏
router.post('/star', (req, res, next) => {
  // 1. 接收参数（拍品id)
  // 2. 将用户id，拍品id，插入收藏表
  // 3. 返回收藏状态， ture表示收藏成功，false表示取消收藏
  res.send('根据拍品id 收藏')
})
// 根据type获取用户收藏
router.post('/userStars', (req, res, next) => {
  // 1. 接收参数（type：竞拍中，待开始，全部）
  // 2. 查询收藏表，然后根据收藏表内容去查询拍品表，
  // 3. 在根据type，返回拍品表内容
  res.send('根据type获取用户收藏')
})

module.exports = router
