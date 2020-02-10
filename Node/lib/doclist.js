var mongoose = require('mongoose');
var doclist = require('./doclist.json');

// create a schema
var docListSchema = mongoose.Schema(doclist);


var docListModel =global.db.model('doclist',docListSchema,'doc');
exports.getList = function(username) {

	
  
};

exports.update = function(docid) {
 
};

exports.insert = function(obj) {
	return docListModel.create(obj);
 
};