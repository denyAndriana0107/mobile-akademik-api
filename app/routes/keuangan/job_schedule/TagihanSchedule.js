module.exports = app => {
    const TagihanModel = require("../../../model/keuangan/tagihan/TagihanModel");

    const schedule = require('node-schedule');
    const rule = new schedule.RecurrenceRule();
    rule.date = 1;
    rule.hour = 3;
    rule.minute = 30;
    rule.tz = 'Asia/Jakarta';

    schedule.scheduleJob(rule, async (error) => {
        TagihanModel.create((err, result) => {
            if (err) {
                throw err;
            }
        });
    });
}