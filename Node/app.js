/*
  入口文件
*/
const express = require('express')
const path = require('path')
const logger = require('morgan')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const session = require('express-session')

// 引入api路由模块
const indexRoute = require('./server/api/index')
const usersRoute = require('./server/api/users')
const auctionRoute = require('./server/api/auction')
const adminRoute = require('./server/api/admin/admin') // 后台管理总路由

// 引入数据库配置
const db = require('./config/db')

const app = express()

// view engine setup 设置所有路由请求的视图路径
app.set('views', path.join(__dirname, 'views')) // 设置路由渲染文件根路径
// 设置html渲染模版
app.engine('.html', require('ejs').__express)
app.set('view engine', 'html')

// 项目配置中间件
app.use(logger('dev')) // 控制台日志
app.use('/static', express.static(path.join(__dirname, 'public'))) // 挂载静态资源路径

// 设置路由访问路径
app.use('/api/index', indexRoute)
app.use('/api/users', usersRoute)
app.use('/api/auction', auctionRoute)
app.use('/api/admin', adminRoute)

app.listen(3000)
