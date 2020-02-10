var Schema = require('mongoose').Schema;
var mySchema = Schema({name: String});

/* global db */
module.exports = db.model('MyModel', mySchema);