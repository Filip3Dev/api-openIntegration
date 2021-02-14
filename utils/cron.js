"use strict";
const cron = require('node-cron');
const integration = require('../api/integration/integration.controller');


exports.startCron = async () => {
    console.log("Starting...")
    let time = '59 23 * * *';
    const timer = cron.schedule(time,  () => {
        let today = new Date().toJSON().slice(0, 10);
        integration.loadData(today);
    }, {
        scheduled: true,
        timezone: "America/Sao_Paulo"
    });
    timer.start();
    return true;
};