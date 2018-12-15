const mongoose = require('mongoose');
const config = require('config');

const connect = async () => {
    const conn = await mongoose.connect(config.get('Database.dbConnectionString'),
        { useNewUrlParser: true });
    console.log('Connected to mongo database');
    return conn;
}

const disconnect = async () => mongoose.disconnect();

module.exports = Object.assign({}, { connect, disconnect });



