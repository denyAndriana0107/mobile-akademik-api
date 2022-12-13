const PresensiModel = require("../../../model/presensi/siswa/PresensiModel");
var uuid = require("uuid");
var getTimeStamp = require("../../../helper/GetTimeStamps");
var getTimeDiff = require("../../../helper/GetTimeDiff");

// create
exports.presensiSiswa = (req, res, next) => {
    const presensi = new PresensiModel({
        waktu_presensi: getTimeStamp.time(),
        device_info: req.body.device_info,
        ip_address_info: req.body.ip_address_info,
        lokasi_info: req.body.lokasi_info,
        status_hadir: 1,
        status_terlambat: getTimeDiff.statusTerlambat(getTimeDiff.calculate(getTimeStamp.time(), '07:00')),
        foto: req.body.foto,
        keterangan_tidak_hadir: req.body.keterangan_tidak_hadir
    });
    PresensiModel.presensi(req.user.username, presensi, (err, result) => {
        if (err) {
            if (err.kind === "data_not_found") {
                return res.status(404).send({
                    message: "not_found"
                });
            }
            return res.status(500).send({
                message: err
            });
        } else {
            return res.status(200).send({
                message: "presensi sukses"
            });
        }
    });
}
// read
exports.getStatusPresensiNow = (req, res, next) => {
    const data = new PresensiModel({
        id_siswa: req.user.username,
        tanggal_presensi: getTimeStamp.date()
    });
    PresensiModel.getStatusNow(data, (err, result) => {
        if (err) {
            if (err.kind === "data_not_found") {
                return res.status(404).send({
                    message: "not_found"
                });
            }
            return res.status(500).send({
                message: err
            });
        } else {
            return res.status(200).send({
                message: result
            });
        }
    });
}
exports.calculatePresentaseKehadiran = (req, res, next) => {
    const data = new PresensiModel({
        id_siswa: req.user.username
    });
    PresensiModel.calculatePresensiCurrent(data, (err, result) => {
        if (err) {
            if (err.kind == "data_not_found") {
                return res.status(404).send({
                    message: "not_found"
                });
            }
            return res.status(500).send({
                message: err
            });
        } else {
            return res.status(200).send({
                message: result
            });
        }
    });
}
exports.logsPresensi = (req, res, next) => {
    var user = req.user.username;
    var b = user.split('_');
    user = b[b.length - 1];
    PresensiModel.logsPresensi(user, (err, result) => {
        if (err) {
            if (err.kind === "data_not_found") {
                return res.status(404).send({
                    message: "not_found"
                });
            }
            return res.status(500).send({
                message: err
            });
        } else {
            return res.status(200).send({
                message: result
            });
        }
    });
}