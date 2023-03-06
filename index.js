const dotenv = require('dotenv');
const daemon = require('daemonize2').setup({
    main: 'domaind.js',
    name: 'domaind',
    pidfile: 'domaind.pid',
});

switch(process.argv[2]) {
    case 'start':
        daemon.start();
        break;
    case 'stop':
        daemon.stop();
        break;
    case 'restart':
        daemon.stop(() => {
           daemon.start();
        });
        break;
    case 'reload':
        console.log('Reloading configuration...');
        daemon.sendSignal('SIGUSR1');
        break;
    case 'add':

        break;
    case 'remove':

        break;
    default:
        console.log('Usage: domaind [start|stop]');
}
