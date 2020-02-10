var mongoose = require("mongoose");

var docModel = require("../models/doc.server.model");

module.exports = {
	create: function(req, res, next) {

		// var docEnity = new docModel(req.body);
		var docEnity = new docModel({
			title: 'aaa',
			type: 'dd',
			ext: '.jpg',
			size: 1024,
			Content: 'dsf ',
			created: Date.now(),
			creater: 'dsfadf '

		});
		console.log(docEnity);
		docModel.create(docEnity, function(err) {
			if (err) return next(err);

			return res.json(docEnity);
		});


	},
	getList: function(req, res, next) {

		var pagesize = parseInt(req.query.pagesize, 10) || 10;
		var pagestart = parseInt(req.query.pagestart, 10) || 1;
		console.log(pagesize + "  " + pagestart);
		docModel.find()
			.skip((pagestart - 1) + pagestart)
			.limit(pagesize).exec(function(err, docs) {
				if (err) return next(err);
				if (!docs) return next(new Error('doc not  found'));

				return res.json(docs);
				//return res.json({id:1,name:"dddd"});
			});
	},
	getById: function(req, res, next) {
		//if (!did) return next(new Error('did not found'));
		console.log( req.params.did);
		docModel.findOne({
				_id: req.params.did
			})
			.exec(function(err, docs) {
				if (err) return next(err);
				if (!docs) return next(new Error('doc not  found'));

				return res.json(docs);
			});
	}
};