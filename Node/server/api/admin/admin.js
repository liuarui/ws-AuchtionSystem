/* 
  后台管理路由文件
*/

const express = require('express')
const router = express.Router()

const auctionList = require('./auctionList/auctionList')
const userList = require('./userList/userList')

router.use('/auction', auctionList)
router.use('/user', userList)

// 后台管理登陆
router.post('/login', (req, res, next) => {
  // 1. 根据用户密码查询表，并查询roleId，0为普通用户，无法登陆后台管理，1为管理员，可登陆后台管理
  // 2. 返回登陆
  res.send('后台管理登陆')
})

module.exports = router
