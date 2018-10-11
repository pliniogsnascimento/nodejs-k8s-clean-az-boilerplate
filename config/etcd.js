const Etcd = require('node-etcd');

const etcdConfigs = require('./etcdConfig');

const registerService = (app, config) => {

    const routes = app._router.stack;

    console.log(etcdConfigs);

    let etcd = new Etcd(etcdConfigs.etcdHost + ":" + etcdConfigs.etcdPort);
    let json = { hostname: config.configs.host, port: config.configs.port, GET: [], POST: [], PATCH: [], DELETE: [] }

    let previousMethod;
    routes.forEach((r) => {
        
        if (r.route && r.route.methods) {
            previousMethod = Object.keys(r.route.methods)[0];
        }

        if (r.route && r.route.path) {

            switch (previousMethod) {
                case 'get':
                    json.GET.push(r.route.path)
                    break;

                case 'post':

                    json.POST.push(r.route.path)
                    break;

                case 'delete':
                    json.DELETE.push(r.route.path)
                    break;

                case 'patch':
                    json.PATCH.push(r.route.path)
                    break;
            }
        }

    })
    console.log('Registered with etcd as /services/products');
    etcd.set('/services/products',JSON.stringify(json));

};

module.exports = Object.assign({}, { registerService });