module.exports.startMonitoring = (req, res, next) => {

    let promise = new Promise((resolve, reject) => {

            let log = new String();
            log = log.concat(
                '[INFO]Request received...\n',
                'Time: ' + new Date() + '\n',
                'Remote IP: ' + req.ip + '\n',
                'URL: ' + req.originalUrl + '\n',
                'Path: ' + req.path +'\n',
                'Method: ' + req.method + '\n', 
                'Params: ' + JSON.stringify(req.params) + '\n',
                'Query: ' + JSON.stringify(req.query) + '\n',
                'Body: ' + JSON.stringify(req.body) + '\n'
            );

            setImmediate(() => {
                resolve(log);
            })
            
        }
    ).then(log => {
        console.log(log);
    })
    
    next();
}