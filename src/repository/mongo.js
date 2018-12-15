const mongoose = require('mongoose');
const config = require('config');

const connect = async () => {
    try {
        const conn = await mongoose.connect(config.get('Database.dbConnectionString'),
        { useNewUrlParser: true });
        console.log('Connected to mongo database');
        return conn;
    }
    catch(err) {
        console.error('Error connecting with the database');
    }
}

const disconnect = async () => mongoose.disconnect();

module.exports = Object.assign({}, { connect, disconnect });



