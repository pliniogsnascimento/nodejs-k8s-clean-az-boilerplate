const mongoose = require('mongoose');


const getMongoURI = (config) => {
    let uri;
    if (!config.user || !config.password) {
        uri = `mongodb://${config.server}:${config.port}/${config.db}`;
    } else {
        uri = `mongodb://${config.user}:$config.password@${config.server}:${config.port}/${config.db}`;
    }
    return uri;
}

let connect = (config, mediator) => {

    mediator.once('boot.ready', () => {
        mongoose.connect(getMongoURI(config),{useNewUrlParser: true }, (err, client) => {
            if (err) {
                console.log('Falha ao executar conexão com MongoDB');
                mediator.emit('db.error', err)
            } else {
                console.log('MongoDB Conectado !!!');
                mediator.emit('db.ready', client)
            }
        });
    })
}

module.exports = Object.assign({}, { connect });



