const mongoose = require('mongoose');

module.exports.connect = async ({ logger, config }) => {
    try {
        const conn = await mongoose.connect(config.get('Database.dbConnectionString'),
        { useNewUrlParser: true });
        logger.info('Connected to mongo database');
        return conn;
    }
    catch(err) {
        logger.error('Error connecting with the database');
        connect();
    }
}

module.exports.disconnect = async () => mongoose.disconnect();
