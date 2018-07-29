const dbSettings = {
    port: process.env.DB_PORT || '27017',
    server: process.env.DB_SERVER || 'localhost',
    db: process.env.DB || 'products',
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD 
}


module.exports = Object.assign({}, {dbSettings})