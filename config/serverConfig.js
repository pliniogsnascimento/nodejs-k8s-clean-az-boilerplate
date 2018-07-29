const serverSettings = {
    port: process.env.SERVER_PORT || '5000',
}

module.exports = Object.assign({}, {serverSettings})