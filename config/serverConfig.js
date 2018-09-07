const serverSettings = {
    host: process.env.SERVER_HOST || 'localhost',
    port: process.env.SERVER_PORT || '5000'
}

module.exports = Object.assign({}, {serverSettings})