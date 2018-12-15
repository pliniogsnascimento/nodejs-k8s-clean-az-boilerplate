module.exports.health = (app) => require('./health.route')(app);

module.exports.configure = (app) => {
    require('./jogo.route')(app);
    // require('./console.route')(app);
}