/* 
  用户路由文件
*/

const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt')

const db = require('../../utils/Database')
const Result = require('../../utils/Result')
const Token = require('../../utils/Token')
const saltRounds = 10 // 加密盐池
// 注册
router.post('/register', bodyParser.json(), async (req, res, next) => {
  let uname = req.body.username
  let pwd = req.body.password
  ///// todo 数据校验拦截 //////

  // 1.先检查数据库是否含有该用户名
  let selectResult = await db.select('username', 'user', { username: uname })
  let register = selectResult.length === 0 ? false : true
  // 2.如果有则返回用户名已注册，注册失败
  if (register === true) {
    return res.json(
      Result.jsonResult(
        {
          register: true,
        },
        '用户已注册',
      ),
    )
  } else {
    // 3.如果没有则将数据插入数据库
    // 加密
    bcrypt.hash(pwd, saltRounds, async (err, hash) => {
      let insertResult = await db.insert({ username: uname, password: hash }, 'user')
      // 4.返回注册成功信息
      return res.json(Result.resultHandle(insertResult))
    })
  }
})
// 登陆
router.post('/login', bodyParser.json(), async (req, res, next) => {
  let uname = req.body.username
  let pwd = req.body.password
  // 1.先检查数据库是否含有该用户名
  let selectRegister = await db.select('username', 'user', { username: uname })
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
  let selectResult = await db.select('password', 'user', { username: uname })
  // 1. 接收参数，在数据库查询是否符合
  bcrypt.compare(pwd, selectResult[0].password, (err, result) => {
    if (result === true) {
      // 2. 如果符合则返回登陆成功+token
      Token.setToken(uname).then(data => {
        return res.json(Result.jsonResult({ token: data }, '登陆成功'))
      })
    } else {
      // 3. 不成功返回登陆失败
      return res.json('登陆失败')
    }
  })
})
// 登出
router.post('/logout', (req, res, next) => {
  // 1.将token加入黑名单，校验token 前先确定是否在黑名单中存在，存在则token失效
  let token = req.headers['authorization']
  Token.revokedToken(token).then(data => {
    // 2. 返回注销成功
    res.json(Result.jsonResult({ revokedToken: data }, '注销成功'))
  })
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
