module.exports = app => {
    const PresensiModel = require("../../../model/presensi/siswa/PresensiModel");
    var getTimeStamp = require("../../../helper/GetTimeStamps");
    var CekLibur = require("../../../helper/CheckHoliday");
    require("dotenv").config();
    const express = require("express");
    const router = express.Router();
    const job = () => {
        return new Promise((resolve, reject) => {
            PresensiModel.create(async (error, resulr) => {
                if (error) {
                    reject(error);
                } else {
                    resolve();
                }
            });
        })
    }
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

    // server version callback
    // router.post('/presensi/siswa/job', function (req, res, next) {
    //     if (CekLibur.result(getTimeStamp.timestamp()) == false && getTimeStamp.day() != 0) {
    //         job().then((succes) => {
    //             return res.status(200).send({
    //                 message: 'ok'
    //             });
    //         }).catch((error) => {
    //             return res.status(500).send({
    //                 message: error
    //             });
    //         });
    //     }
    // });

    // cyclic versrion
    router.post('/presensi/siswa/job', async function (req, res, next) {
        if (CekLibur.result(getTimeStamp.timestamp()) == false && getTimeStamp.day() != 0) {
            PresensiModel.create((err, result) => {
                if (err) {
                    return res.status(500).send({
                        mesagge: err
                    });
                } else {
                    return res.status(201).send({
                        mesagge: 'presensi created'
                    });
                }
            });
        }
    });
    app.use('/admin/', router);
}