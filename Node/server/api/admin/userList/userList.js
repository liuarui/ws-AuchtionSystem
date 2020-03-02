/* 
  后台管理 用户表 路由文件
*/

const express = require('express')
const router = express.Router()

// 新增用户  类似注册用户
router.post('/addUser', (req, res, next) => {
  // 1. 接收参数
  // 2. 
  // 3. 返回数据
  res.send('根新增用户  类似注册用户')
})
// 删除用户
router.post('/delectUser', (req, res, next) => {
  // 1. 根据username删除用户
  // 2. 根据参数返回相应数据
  res.send('删除用户')
})
// 重用接口--修改用户信息 /// 
module.exports = router
