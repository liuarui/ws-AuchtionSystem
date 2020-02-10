var mongoose = require("mongoose");


var docSchema = new mongoose.Schema({
	title: String,
	type: String,
	ext: String,
	size: Number,
	Content: String,
	created: {
		type: Date,
		default: Date.now
	},
	creater: {
		
		name: String
	}

});

var docModel = db.model("doc", docSchema);
module.exports = docModel;