var Schema = require('mongoose').Schema;
var doclist = require('doclist.json');

// create a schema
var doclistSchema = Schema(doclist);


doclistModel = db.model('doclistModel', doclistSchema);


exports.home = function(req, res, next) {
  model.find(function(err, docs) {
    if (err) return next(err);
    res.send(docs);
  });
};

exports.modelName = function(req, res) {
  res.send('my model name is ' + model.modelName);
};

exports.insert = function(req, res, next) {
  model.create({name: 'inserting ' + Date.now()}, function(err, doc) {
    if (err) return next(err);
    res.send(doc);
  });
};