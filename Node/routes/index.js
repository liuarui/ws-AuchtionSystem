var express = require('express');
var router = express.Router();
var doclist=require('../lib/doclist.js');

/* GET home page. */

router.get('/',function(req, res){
  var d=doclist.insert({name: 'inserting ' + Date.now()});
 res.send(d);
  //next();

});

module.exports = router;
