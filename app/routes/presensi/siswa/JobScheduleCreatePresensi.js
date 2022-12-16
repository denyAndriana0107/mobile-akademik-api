module.exports = app => {
    const PresensiModel = require("../../../model/presensi/siswa/PresensiModel");
    var getTimeStamp = require("../../../helper/GetTimeStamps");
    var CekLibur = require("../../../helper/CheckHoliday");
    const express = require("express");
    const router = express.Router();
    const job = () => {
        return new Promise((resolve, reject) => {
            PresensiModel.create((error, resulr) => {
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
    router.post('/presensi/siswa/job', async function (req, res, next) {
        if (CekLibur.result(getTimeStamp.timestamp()) == false && getTimeStamp.day() != 0) {
            job().then((succes) => {
                return res.status(200).send({
                    message: 'ok'
                });
            }).catch((error) => {
                return res.status(500).send({
                    message: error
                });
            });
        }
    });


    router.get('/presensi/test/job/:username/:password', function (req, res, next) {
        // var authheader = req.headers.authorization;
        // authheader = 'pass';
        // if (!authheader) {
        //     return res.status(500).send({
        //         message: 'no ok'
        //     });
        // }
        // var auth = new Buffer.from(authheader.split(' ')[1],
        //     'base64').toString().split(':');
        // auth[0] = 'admin';
        // auth[1] = 'Monalisa@123';
        // if (auth[0] == 'admin' && auth[1] == 'Monalisa@123') {
        //     return res.status(200).send({
        //         message: 'oi admin'
        //     });
        // } else {
        //     return res.status(500).send({
        //         message: 'ok'
        //     });
        // }

    });
    app.use('/admin/', router);
}