/*
  入口文件
*/
const express = require('express')
const path = require('path')
const logger = require('morgan')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
// const session = require('express-session')
const expressJwt = require('express-jwt')

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
  res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild')
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
      .then(data => {
        console.log('解析token用户数据为：', data)
        req.data = data
        return next()
      })
      .catch(error => {
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
  }),
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

app.listen(3000)
