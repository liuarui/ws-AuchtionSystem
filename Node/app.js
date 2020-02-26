/*
  入口文件
*/
const express = require('express')
const path = require('path')
const logger = require('morgan')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const session = require('express-session')

// 引入路由模块
const indexRoute = require('./routes/index')
const usersRoute = require('./routes/users')
const auctionRoute = require('./routes/auction')
const adminRoute = require('./routes/index') // 后台管理总路由

// 引入数据库配置
const db = require('./config/db')

const app = express()

// view engine setup 设置所有路由请求的视图路径
app.set('views', path.join(__dirname, 'views')) // 设置路由渲染文件根路径
// 设置html渲染模版
app.engine('.html', require('ejs').__express)
app.set('view engine', 'html')

// 项目配置中间件
app.use(logger('dev'))
app.use('/static', express.static(path.join(__dirname, 'public'))) // 挂载静态资源路径

// 设置路由访问路径
app.use('/', indexRoute)
app.use('/users', usersRoute)
app.use('/auction', auctionRoute)
app.use('/admin', adminRoute)

app.listen(3000)
