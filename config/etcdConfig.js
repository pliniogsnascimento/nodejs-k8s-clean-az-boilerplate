const etcdSettings = {
    etcdHost: process.env.ETCD_HOST  || '127.0.0.1',
    etcdPort: process.env.ETCD_PORT  || '2379'
}

module.exports = Object.assign({}, {etcdSettings})