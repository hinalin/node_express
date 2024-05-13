const cron = require('node-cron');

const cron1 = () => {
    cron.schedule(' * * * * *', () => {
        console.log('Cron1 is running every minute');
    });
}

const cron2 = () => {
    cron.schedule(' * * * * * * ', () => {
        console.log('Cron2 is running every second');
    });
}

const cron3 = () => {
    cron.schedule(' */10 * * * * * ', () => {
        console.log('Cron3 is running in every 10 seconds');
    });
}

module.exports = { cron1 , cron2 , cron3 };