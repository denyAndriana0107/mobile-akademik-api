module.exports = app => {
    const PeminjamanBukuModel = require("../../model/perpustakaan/PeminjamanBukuModel");

    const schedule = require('node-schedule');
    const rule = new schedule.RecurrenceRule();
    rule.hour = 4;
    rule.minute = 10;
    rule.tz = 'Asia/Jakarta';

    schedule.scheduleJob(rule, async (error) => {
        PeminjamanBukuModel.updateStatusExpired((err, result) => {
            if (err) {
                throw err;
            }
        });
    });
}