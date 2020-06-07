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
        true,
        [],
        0
      )
    )
  } else {
    // 3.如果没有则将数据插入数据库
    // 加密
    bcrypt.hash(pwd, saltRounds, async (err, hash) => {
      let insertResult = await db.insert(
        { username: uname, password: hash },
        'user'
      )
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
      Result.jsonResult({ register: false }, '当前用户名未注册', true, [], 0)
    )
  }
  let selectResult = await db.select('userId, password', 'user', {
    username: uname,
  })
  // 1. 接收参数，在数据库查询是否符合
  bcrypt.compare(pwd, selectResult[0].password, (err, result) => {
    if (result === true) {
      // 2. 如果符合则返回登陆成功+token
      Token.setToken(uname, selectResult[0].userId).then((data) => {
        return res.json(Result.jsonResult({ token: data,userId:selectResult[0].userId }, '登陆成功'))
      })
    } else {
      // 3. 不成功返回登陆失败
      return res.json(Result.jsonResult({}, '登陆失败', true, [], 0))
    }
  })
})
// 登出
router.all('/logout', (req, res, next) => {
  // 1.将token加入黑名单，校验token 前先确定是否在黑名单中存在，存在则token失效
  let token = req.headers['authorization']
  Token.revokedToken(token)
    .then((data) => {
      // 2. 返回注销成功
      res.json(
        Result.jsonResult({ revokedToken: data }, '注销成功', true, [], -1)
      )
    })
    .catch((err) => {
      res.json(Result.jsonResult({ err: err }, '注销失败', true, [], 0))
    })
})
// 获取用户信息
router.get('/getUserMes', async (req, res, next) => {
  // 1. 根据用户名去数据库查询用户信息
  let uname = req.data.username
  let selectResult = await db.select(
    'userId,username,name,sex,avatarPath',
    'user',
    { username: uname }
  )
  res.json(Result.resultHandle(selectResult))
})
// 修改用户信息
router.post('/updateUserMes', bodyParser.json(), async (req, res, next) => {
  // 1.接收参数
  let uname = req.data.username
  let name = req.body.name
  let sex = req.body.sex
  let aPath = req.body.avatarPath
  let tempObject = {}
  if (name != undefined) {
    tempObject.name = name
  }
  if (sex != undefined) {
    tempObject.sex = sex
  }
  if (aPath != undefined) {
    tempObject.avatarPath = aPath
  }
  // 2.执行update操作
  let updateResult = await db.update(tempObject, 'user', { username: uname })
  // 3.返回成功或失败
  res.json(Result.resultHandle(updateResult))
})

// 修改用户密码
router.post(
  '/updateUserPassword',
  bodyParser.json(),
  async (req, res, next) => {
    // 1. 接收参数
    let uname = req.body.username
    let oldpwd = req.body.oldPassword
    let newpwd = req.body.newPassword
    // 2.先检查数据库是否含有该用户名
    let selectResult = await db.select('password', 'user', { username: uname })
    let hasUser = selectResult.length === 0 ? false : true
    if (hasUser === true) {
      // 3.验证旧密码是否正确，不正确返回修改失败
      bcrypt.compare(oldpwd, selectResult[0].password, (err, result) => {
        if (result === true) {
          // 4.修改新密码，更新数据库
          bcrypt.hash(newpwd, saltRounds, async (err, hash) => {
            let updateResult = await db.update({ password: hash }, 'user', {
              username: uname,
            })
            // 5.返回修改结果
            return res.json(Result.resultHandle(updateResult))
          })
        } else {
          return res.json(
            Result.jsonResult(
              { change: false },
              '修改失败,旧密码不正确',
              true,
              [],
              0
            )
          )
        }
      })
    } else {
      return res.json(
        Result.jsonResult({ change: false }, '修改失败,用户不存在', true, [], 0)
      )
    }
  }
)
// 获取用户订单消息
router.get('/getUserOrder', async (req, res, next) => {
  // 1. 接受参数
  let uid = req.data.userId
  // 2. 查询用户拍卖订单表获取aucId
  let orderArray = await db.select('aucId', 'auctionOrder', { userId: uid })
  if (orderArray.length === 0) {
    return res.json(Result.resultHandle(orderArray))
  }
  let queryParm = ''
  orderArray.forEach((value) => {
    queryParm = queryParm + `aucId = ${value.aucId} OR `
  })
  queryParm = queryParm.substr(0, queryParm.length - 4)
  // 3. 查询回来的aucId
  let selectResult = await db.select('*', 'auctionOrder', true, queryParm)
  let fResult = await Promise.all(
    selectResult.map(async (value) => {
      return (async () => {
        let tempObj = { ...value }
        let resData = await db.select('*','userStar', true,`aucId = ${value.aucId} AND userId = ${value.userId}`)
        if (resData.length === 0) {
          tempObj['star'] = false
        }
        if (resData.length > 0) {
          tempObj['star'] = true
        }
        return tempObj
      
      })()
    })
  )
  // let fres = await getStar()
  // 3. 返回结果
  return res.json(Result.resultHandle(fResult))
})
///////////////// 收藏部分 ////////////////
// 根据拍品id 收藏
router.post('/star', bodyParser.json(), async (req, res, next) => {
  // 1. 接收参数（拍品id)
  let uid = req.data.userId
  let aucId = req.body.aucId
  // 2. 将用户id，拍品id，插入收藏表
  let insertResult = await db.insert({ userId: uid, aucId: aucId }, 'userStar')
  if (insertResult === 3) {
    let deleteResult = await db.delete(
      { userId: uid, aucId: aucId },
      'userStar'
    )
    if (deleteResult === -1) {
      return res.json(Result.jsonResult({ star: false }, '取消收藏成功'))
    }
  }
  // 3. 返回收藏状态， ture表示收藏成功，false表示取消收藏
  res.json(Result.jsonResult({ star: true }, '收藏成功'))
})
// 根据获取用户收藏
router.get('/getUserStars', async (req, res, next) => {
  // 1. 接受参数
  let uid = req.data.userId
  // 2. 查询收藏表，然后根据收藏表 的id去查询拍品表，
  let starsArray = await db.select('aucId', 'userStar', { userId: uid })
  //  无收藏则返回空
  if (starsArray.length === 0) {
    return res.json(Result.resultHandle(starsArray))
  }
  let queryParm = ''
  starsArray.forEach((value) => {
    queryParm = queryParm + `aucId = ${value.aucId} OR `
  })
  queryParm = queryParm.substr(0, queryParm.length - 4)
  // 3. 查询回来的aucId
  let selectResult = await db.select(
    'aucId,name,price,provider,state,startTime,endTime',
    'auction',
    true,
    queryParm
  )
  // 3.返回拍品表内容
  return res.json(Result.resultHandle(selectResult))
})

module.exports = router
