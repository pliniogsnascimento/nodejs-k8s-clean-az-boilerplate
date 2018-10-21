module.exports = function queueController(amqp) {

    this.connectQueue = () => {
        amqp.connect('amqp://192.168.0.3:5672', (err, conn) => {
            conn.createChannel((err, ch) => {

                ch.assertQueue('', {exclusive: true}, function(err, q) {
                    var corr = generateUuid();
                    
                    let json = {
                        method: 'simpleMail',
                        to: 'matheus.ppj@gmail.com',
                        subject: 'Fleck é uma safada',
                        body: 'Tei pow terei tei tei'
                    }
                 
                    console.log(' [x] Requesting mail');
              
                    ch.consume(q.queue, function(msg) {
                      if (msg.properties.correlationId == corr) {
                        console.log(' [X] %s', msg.content.toString());
                        setTimeout(function() { conn.close(); process.exit(0) }, 500);
                      }
                    }, {noAck: true});
              
                    ch.sendToQueue('rpc_queue',
                    new Buffer(JSON.stringify(json)),
                    { correlationId: corr, replyTo: q.queue });
                  });

            });
        });
    }

    function generateUuid() {
        return Math.random().toString() +
               Math.random().toString() +
               Math.random().toString();
      }
}

