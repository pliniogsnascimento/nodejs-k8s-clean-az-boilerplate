const mongoose = require('mongoose');

module.exports.connect = async ({ logger, config }) => {
    try {
        const conn = await mongoose.connect(config.get('Database.dbConnectionString'), { 
                useNewUrlParser: true, 
                connectTimeoutMS: config.get('Database.timeout')
            });

        logger.info('Connected to mongo database');
        
        return conn;
    }
    catch(err) {
        logger.error('Error connecting with the database');
        logger.error(err);
    }
}

module.exports.disconnect = async () => mongoose.disconnect();
