var express = require('express');
var userRouter = express.Router();

/* GET users listing. */
userRouter.get('/', function(req, res, next) {
  res.send('user respfdddfdddfond with a resource');
});

module.exports = userRouter;