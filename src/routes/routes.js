module.exports = (app, config) => {
    require('./produto.route')(app, config);
    require('./health.route')(app, config);
}