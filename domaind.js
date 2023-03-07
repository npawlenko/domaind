const cluster = require('cluster');

if (cluster.isPrimary) {
    //Master process
    const createWorkers = () => {
        const domains = require('./config.json');
        for (let domain of domains.follow) {
            const worker = cluster.fork();
            worker.send(domain);
        }
    };

    createWorkers();


    process.on('SIGUSR1', () => {
        for (let worker in cluster.workers) {
            worker.kill();
        }
        createWorkers();
    });
    return;
}

//Worker process
const NodeCache = require('node-cache');
const cache = new NodeCache();

let running = true;
let domain;

process.on('SIGUSR1', () => {
    running = false;
});
process.on('message', (payload) => {
    domain = payload;
});


while (domain === null) ;

//Worker loop
do {

} while (running);

