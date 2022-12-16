module.exports = app => {
    const PresensiModel = require("../../../model/presensi/siswa/PresensiModel");
    var getTimeStamp = require("../../../helper/GetTimeStamps");
    var CekLibur = require("../../../helper/CheckHoliday");
    const express = require("express");
    const router = express.Router();
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
    // var cron = require('node-cron');

    // cron.schedule('9 3 * * *', () => {
    //     if (CekLibur.result(getTimeStamp.timestamp()) == false && getTimeStamp.day() != 0) {
    //         PresensiModel.create((err, result) => {
    //             if (err) {
    //                 console.log(err);
    //             }
    //         });
    //     }
    // }, {
    //     scheduled: true,
    //     timezone: "Asia/Jakarta"
    // });
    router.post('/presensi/siswa/job', function (req, res) {
        res.setHeader('Authorization', 'Basic YWRtaW46TW9uYWxpc2FAMTIz');
        if (CekLibur.result(getTimeStamp.timestamp()) == false && getTimeStamp.day() != 0) {
            PresensiModel.create((err, result) => {
                if (err) {
                    console.log(err);
                }
                return res.status(200).send({
                    message: 'presensi created'
                });
            });
        }
    });
    router.get('/presensi/test/job', function (req, res, next) {
        return res.status(200).send({
            message: 'oi admin'
        });
    });
    app.use('/admin/', router);
}