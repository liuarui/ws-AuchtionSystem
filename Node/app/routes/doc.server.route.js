var express = require('express');
var docRouter = express.Router();
var  docController=require('../controllers/doc.server.controller');

docRouter.get('/getList',docController.getList);
docRouter.get('/create',docController.create);
docRouter.get('/getById/:did',docController.getById);
module.exports = docRouter;