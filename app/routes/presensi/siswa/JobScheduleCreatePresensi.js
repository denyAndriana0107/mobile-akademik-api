module.exports = app => {
    const PresensiModel = require("../../../model/presensi/siswa/PresensiModel");
    var getTimeStamp = require("../../../helper/GetTimeStamps");
    var CekLibur = require("../../../helper/CheckHoliday");

    const schedule = require('node-schedule');
    const rule = new schedule.RecurrenceRule();
    rule.hour = 1;
    rule.minute = 10;
    rule.tz = 'Asia/Jakarta';
    schedule.scheduleJob(rule, async (error) => {
        if (CekLibur.result(getTimeStamp.timestamp()) == false && getTimeStamp.day() != 0) {
            PresensiModel.create((err, result) => {
                if (err) {
                    throw err;
                }
            });
        }
    });


}