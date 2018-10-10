
module.exports.health = require('./health.route')(app, config);

module.exports.configure = (app, config) => {
    
    require('./jogo.route')(app, config.repo);
    require('./console.route')(app, config.repo);
}