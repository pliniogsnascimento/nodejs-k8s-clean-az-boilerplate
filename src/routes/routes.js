module.exports = (app, config) => {
    //require('./produto.route')(app, config);
    require('./health.route')(app, config);
    require('./jogo.route')(app, config.repo);
    //require('./console.route')(app, config);
}