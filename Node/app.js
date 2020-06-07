/*
  入口文件
*/
const express = require('express')
const path = require('path')
const logger = require('morgan')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const expressJwt = require('express-jwt')

//https
const fs = require('fs')
const http = require('http')
const https = require('https')
const privateKey = fs.readFileSync('./https/3411328_liuarui.top.key', 'utf8')
const certificate = fs.readFileSync('./https/3411328_liuarui.top.pem', 'utf8')
const credentials = { key: privateKey, cert: certificate }

// 引入api路由模块
const indexRoute = require('./server/api/index')
const usersRoute = require('./server/api/users')
const auctionRoute = require('./server/api/auction')
const adminRoute = require('./server/api/admin/admin') // 后台管理总路由

// 引入数据库配置
const db = require('./utils/Database')
const BaseConfig = require('./config/BaseConfig')
const SecretConfig = require('./config/SecretConfig')

const Token = require('./utils/Token') // token解析函数
const Result = require('./utils/Result') // db处理结果函数

const app = express()

// view engine setup 设置所有路由请求的视图路径
app.set('views', path.join(__dirname, 'views')) // 设置路由渲染文件根路径
// 设置html渲染模版
app.engine('.html', require('ejs').__express)
app.set('view engine', 'html')

// 项目配置中间件
app.use(logger('dev')) // 控制台日志
app.use('/static', express.static(path.join(__dirname, 'public'))) // 挂载静态资源路径
app.use(express.static(path.join(__dirname, 'views'))) // 挂载vue后台管理页面路径

app.use(bodyParser.urlencoded({ extended: true }))

// 设置跨域请求
app.all('*', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header(
    'Access-Control-Allow-Headers',
    'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild'
  )
  res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS')
  res.header('X-Powered-By', ' 3.2.1')
  res.header('Content-Type', 'application/json;charset=utf-8')
  next()
})

// 解析token获取用户信息
app.use((req, res, next) => {
  let token = req.headers['authorization']
  if (token == undefined) {
    return next()
  } else {
    Token.verToken(token)
      .then((data) => {
        console.log('解析token用户数据为：', data)
        req.data = data
        return next()
      })
      .catch((error) => {
        return next()
      })
  }
})

//验证token是否过期并规定哪些路由不用验证
app.use(
  expressJwt({
    secret: SecretConfig.secretJwtString(),
    isRevoked: Token.isBlackToken,
  }).unless({
    path: BaseConfig.noTokenRouter(), //除了用户登陆和其他的URL都需要验证
  })
)
//当token失效返回提示信息
app.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    return res.status(401).json({
      success: false,
      msg: 'Token验证失效，请重新登陆',
    })
  }
  return next()
})
// 设置路由访问路径
app.use('/api/index', indexRoute)
app.use('/api/users', usersRoute)
app.use('/api/auction', auctionRoute)
app.use('/api/admin', adminRoute)

const httpServer = http.createServer(app)
const httpsServer = https.createServer(credentials, app)

//创建socket 应用
const io = require('socket.io')(httpServer, {
  path: '/test',
  serveClient: false,
  // below are engine.IO options
  pingInterval: 10000,
  pingTimeout: 5000,
  cookie: false,
})

httpServer.listen(8080)
httpsServer.listen(8443)

// socket应用
let clients = {} //客户端对象
io.on('connect', (socket) => {
  clients[socket.id] = socket //保存客户端对象到列表
  console.log(socket.id, '连上了')
  socket.on('userBid', (userId, aucId, bid) =>
    onUserBid(userId, aucId, bid, socket)
  )
  socket.on('userJoined', (userId, aucId) =>
    onUserJoined(userId, aucId, socket)
  )
})
async function onUserBid(userId, aucId, bid, socket) {
  console.log(`用户${userId}对拍品${aucId}出价${bid}`)
  // 1.先查询数据库里aucId的出价，如果bid小于则返回失败
  let insertResult = await db.insert(
    { userId: userId, aucId: aucId, bid: bid },
    'auctionRecord'
  )
  let selectResult = await db.select('*', 'auctionRecord', { aucId: aucId })
  // 2.插入完成后，需要emit出价事件，让客户端知道有人出价
  socket.emit('Bid', selectResult.reverse())
}
async function onUserJoined(userId, aucId, socket) {
  let selectResult = await db.select('*', 'auctionRecord', { aucId: aucId })
  socket.emit('Bid', selectResult.reverse())
}

// 用户接收到消息
async function onMessageReceived(message, socket) {
  console.log(message.text)
  let userId = users[socket.id]
  // 用户id为空返回
  if (!userId) {
    console.log('没有这个用户啦')
    return
  }
  // 保存消息并发送
  await sendAndSaveMessage(message, socket)
}

// 发送之前的消息
async function sendExistingMessages(socket) {
  // 查数据
  await Messages.find({
    chatId: chatId,
  })
    .sort({ createdAt: 1 })
    .exec((err, messages) => {
      //　如果没有任何消息，直接返回
      if (!messages.length) {
        return
      }
      socket.emit('message', messages.reverse())
    })
}

// 保存消息到数据，发送消息给除了当前用户的所有的用户
async function sendAndSaveMessage(msg, socket) {
  //　创建消息数据
  let messageData = new Messages({
    text: msg.text,
    user: msg.user,
    createdAt: new Date(msg.createdAt),
    chatId: chatId,
  })
  let message = await messageData.save()
  // 发送消息给除了当前用户的所有的用户
  socket.broadcast.emit('message', message)
}
