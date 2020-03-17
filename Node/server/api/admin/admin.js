/* 
  后台管理路由文件
*/

const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt')

const auctionList = require('./auctionList/auctionList')
const auctionOrderList = require('./auctionOrderList/auctionOrderList')
const userList = require('./userList/userList')
const userStarList = require('./userStarList/userStarList')

const db = require('../../../utils/Database')
const Result = require('../../../utils/Result')
const Token = require('../../../utils/Token')
const saltRounds = 10 // 加密盐池

router.use('/auction', auctionList)
router.use('/auctionOrder', auctionOrderList)
router.use('/userStar', userStarList)
router.use('/user', userList)

// 后台管理登陆
router.post('/login', bodyParser.json(), async (req, res, next) => {
  // 1. 根据用户密码查询表，并查询roleId，0为普通用户，无法登陆后台管理，1为管理员，可登陆后台管理
  let uname = req.body.username
  let pwd = req.body.password
  // 1.先检查数据库是否含有该用户名
  let selectRegister = await db.select('username,roleId,userId, password', 'user', { username: uname })
  let register = selectRegister.length === 0 ? false : true
  // 2.如果无则返回用户名为未注册，登陆失败
  if (register === false) {
    return res.json(
      Result.jsonResult(
        {
          register: false,
        },
        '当前用户名未注册',
      ),
    )
  }
  // 3. 验证权限
  if (selectRegister[0].roleId === 0) {
    return res.json(
      Result.jsonResult(
        {
          register: true,
        },
        '用户权限不足，请向管理员申请权限',
      ),
    )
  }
  // 4. 处理结果返回
  bcrypt.compare(pwd, selectRegister[0].password, (err, result) => {
    if (result === true) {
      // 2. 如果符合则返回登陆成功+token
      Token.setToken(uname, selectRegister[0].userId).then(data => {
        return res.json(Result.jsonResult({ token: data }, '登陆成功'))
      })
    } else {
      // 3. 不成功返回登陆失败
      return res.json('登陆失败')
    }
  })
})
// 登出
router.all('/logout', (req, res, next) => {
  // 1.将token加入黑名单，校验token 前先确定是否在黑名单中存在，存在则token失效
  let token = req.headers['authorization']
  Token.revokedToken(token)
    .then(data => {
      // 2. 返回注销成功
      res.json(Result.jsonResult({ revokedToken: data }, '注销成功', true, [], -1))
    })
    .catch(err => {
      res.json(Result.jsonResult({ err: err }, '注销失败', true, [], 0))
    })
})
module.exports = router
