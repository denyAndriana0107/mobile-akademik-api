const NilaiModel = require("../../../../model/mata_pelajaran/nilai/role_guru/NilaiModel");
const NilaiJenisModel = require("../../../../model/mata_pelajaran/nilai/role_guru/NilaiJenisModel");
const NilaiFinalModel = require("../../../../model/mata_pelajaran/nilai/role_guru/NilaiFinalModel");
const NotificationModel = require("../../../../model/notification/NotificationModel");
var getTimeStamp = require("../../../../helper/GetTimeStamps");
var CalculateGrade = require("../../../../helper/CalculateGradeNilai");
var uuid = require("uuid");
const { database } = require("firebase-admin");


// ================ insert ================
exports.create = (req, res, next) => {
    const nilai = new NilaiModel({
        id: uuid.v4().substring(0, 10),
        semester: req.body.semester,
        nilai: req.body.nilai,
        id_jenis_nilai: req.body.id_jenis_nilai,
        id_siswa: req.params.id_siswa,
        id_kelas: req.params.id_kelas,
        id_mata_pelajaran: req.params.id_mata_pelajaran,
        inputed: getTimeStamp.timestamp(),
        last_update: null
    });
    NilaiModel.create(nilai, (err, result) => {
        if (err) {
            return res.status(500).send({
                message: err
            });
        } else {
            NilaiFinalModel.sumFinalNilai(nilai.id_siswa, nilai.id_mata_pelajaran, nilai.semester, (err, result) => {
                if (err) {
                    return res.status(500).send({
                        message: "sum nilai error"
                    });
                } else {
                    var nilai2 = (result[0]['Tugas'] * 25 / 100) + (result[0]['Quiz'] * 25 / 100) +
                        (result[0]['UTS'] * 25 / 100) + (result[0]['UAS'] * 25 / 100)
                    const nilai_final = new NilaiFinalModel({
                        id: uuid.v4().substring(0, 10),
                        final_nilai: nilai2,
                        grade: CalculateGrade.result(nilai2).replace(/[\r\n]/gm, ''),
                        semester: nilai.semester,
                        id_siswa: nilai.id_siswa,
                        id_kelas: nilai.id_kelas,
                        id_mata_pelajaran: nilai.id_mata_pelajaran,
                    });
                    NilaiFinalModel.insertFinalNilai(nilai_final.id_siswa, nilai_final.id_mata_pelajaran, nilai_final.semester, nilai_final,
                        (err, result) => {
                            if (err) {
                                return res.status(500).send({
                                    message: err
                                });
                            } else {
                                NotificationModel.readByNIS(nilai_final.id_siswa, (err, resNotif) => {
                                    if (err) {
                                        return res.status(500).send({
                                            message: "input nilai suksek & Notif " + err
                                        });
                                    } else {
                                        const data = {
                                            token: resNotif[0]['token'],
                                            title: 'Nilai',
                                            body: 'Nilai anda telah diinput guru'
                                        }
                                        NotificationModel.createMessageToDevice(data, (err, resMessage) => {
                                            if (err) {
                                                return res.status(500).send({
                                                    message: "Notif " + err
                                                });
                                            } else {
                                                return res.status(200).send({
                                                    message: "input nilai sukses dan Notif Sukses"
                                                });
                                            }
                                        })
                                    }
                                });
                            }
                        });

                }
            });

        }
    });
}
// =============== read ==================
exports.readFinalNilai = (req, res, next) => {
    NilaiFinalModel.readAllByIdMataPelajaranByIdKelas(req.params.id_mata_pelajaran, req.params.id_kelas, (err, result) => {
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
exports.readNilai = (req, res, next) => {
    NilaiModel.readByIdMataPelajaranIdKelas(req.params.id_mata_pelajaran, req.params.id_kelas, req.params.id_siswa, (err, result) => {
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
exports.readListJenisNilai = (req, res, next) => {
    NilaiJenisModel.getAll((err, result) => {
        if (err) {
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
// ========== update ================
exports.updateNilai = (req, res, next) => {
    const nilai = new NilaiModel({
        id: req.params.id_nilai,
        nilai: req.body.nilai,
        semester: req.params.semester,
        id_siswa: req.params.id_siswa,
        id_kelas: req.params.id_kelas,
        id_mata_pelajaran: req.params.id_mata_pelajaran,
        last_update: getTimeStamp.timestamp()
    });
    NilaiModel.updateNilaiSiswaById(nilai, (err, result) => {
        if (err) {
            if (err.kind === "data_not_found") {
                return res.status(404).send({
                    message: 'not_found'
                });
            }
            return res.status(500).send({
                message: err
            });
        } else {
            NilaiFinalModel.sumFinalNilai(nilai.id_siswa, nilai.id_mata_pelajaran, nilai.semester, (err, result) => {
                if (err) {
                    return res.status(500).send({
                        message: "sum nilai error"
                    });
                } else {
                    var nilai2 = (result[0]['Tugas'] * 25 / 100) + (result[0]['Quiz'] * 25 / 100) +
                        (result[0]['UTS'] * 25 / 100) + (result[0]['UAS'] * 25 / 100)
                    const nilai_final = new NilaiFinalModel({
                        id: uuid.v4().substring(0, 10),
                        final_nilai: nilai2,
                        grade: CalculateGrade.result(nilai2).replace(/[\r\n]/gm, ''),
                        semester: nilai.semester,
                        id_siswa: nilai.id_siswa,
                        id_kelas: nilai.id_kelas,
                        id_mata_pelajaran: nilai.id_mata_pelajaran,
                    });
                    NilaiFinalModel.insertFinalNilai(nilai_final.id_siswa, nilai_final.id_mata_pelajaran, nilai_final.semester, nilai_final,
                        (err, result) => {
                            if (err) {
                                return res.status(500).send({
                                    message: err
                                });
                            } else {
                                NotificationModel.readByNIS(nilai_final.id_siswa, (err, resNotif) => {
                                    if (err) {
                                        return res.status(500).send({
                                            message: "input nilai suksek & Notif " + err
                                        });
                                    } else {
                                        const data = {
                                            token: resNotif[0]['token'],
                                            title: 'Nilai',
                                            body: 'Nilai anda telah diinput guru'
                                        }
                                        NotificationModel.createMessageToDevice(data, (err, resMessage) => {
                                            if (err) {
                                                return res.status(500).send({
                                                    message: "Notif " + err
                                                });
                                            } else {
                                                return res.status(200).send({
                                                    message: "update nilai sukses dan Notif Sukses"
                                                });
                                            }
                                        })
                                    }
                                });
                            }
                        });

                }
            });

        }
    });
}