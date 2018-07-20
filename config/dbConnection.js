const mongoose = require('mongoose');
const config = require('./env');
const uri = config.MONGO_URI;

mongoose.connect(uri);
let db = mongoose.connection;

module.exports = db;
