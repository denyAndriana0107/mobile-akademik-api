module.exports = app => {
    const PresensiModel = require("../../../model/presensi/siswa/PresensiModel");
    var getTimeStamp = require("../../../helper/GetTimeStamps");
    var CekLibur = require("../../../helper/CheckHoliday");

    // const schedule = require('node-schedule');
    // const rule = new schedule.RecurrenceRule();
    // rule.hour = 2;
    // rule.minute = 41;
    // rule.tz = 'Asia/Jakarta';
    // console.log("run");
    // schedule.scheduleJob(rule, async (error) => {
    //     if (CekLibur.result(getTimeStamp.timestamp()) == false && getTimeStamp.day() != 0) {
    //         PresensiModel.create((err, result) => {
    //             if (err) {
    //                 throw err;
    //             }
    //         });
    //     }
    // });
    var cron = require('node-cron');

    cron.schedule('9 3 * * *', () => {
        if (CekLibur.result(getTimeStamp.timestamp()) == false && getTimeStamp.day() != 0) {
            PresensiModel.create((err, result) => {
                if (err) {
                    console.log(err);
                }
            });
        }
    }, {
        scheduled: true,
        timezone: "Asia/Jakarta"
    });

}