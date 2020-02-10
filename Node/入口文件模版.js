var express = require('express')
var path = require('path')
var favicon = require('serve-favicon')
var logger = require('morgan')
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')
var ejs = require('ejs')
var mongoose = require('mongoose')
var app = express()

//connect nosql
var nosqluri = 'mongodb://localhost/mytest'
global.db = mongoose.createConnection(nosqluri)

var docRoute = require('./app/routes/doc.server.route.js')
var userRoute = require('./app/routes/user.server.route.js')
// view engine setup
//app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'jade');

app.engine('html', ejs.__express)
app.set('views', __dirname + '/app/views')
app.set('view engine', 'html') // app.set('view engine', 'ejs');
app.set('view options', {
  layout: false,
})
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: false,
  }),
)
app.use(cookieParser())
app.use(express.static(__dirname + '/public'))

app.use('/doc', docRoute)
app.use('/user', userRoute)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found')
  err.status = 404
  next(err)
})

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500)
    res.render('error', {
      message: err.message,
      error: err,
    })
  })
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500)
  res.render('error', {
    message: err.message,

    error: {},
  })
})

module.exports = app
