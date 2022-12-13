const KelasModel = require("../../../model/kelas/profil_kelas/KelasModel");
var uuid = require("uuid");

// insert data kelas baru
exports.create = (req, res, next) => {
    const kelas = new KelasModel({
        id: uuid.v4().substring(0, 10),
        wali_kelas: req.body.wali_kelas,
        id_program_studi: req.body.id_program_studi,
        nama: req.body.nama,
        tingkat: req.body.tingkat,
        tahun_ajaran: req.body.tahun_ajaran
    });
    KelasModel.create(kelas, (err, result) => {
        if (err) {
            if (err.kind === "redundan_data") {
                return res.status(409).send({
                    message: "data_conflict"
                });
            }
            return res.status(500).send({
                message: err
            });
        }
        else {
            return res.status(201).send({
                message: "ok"
            });
        }
    });
}
// hitung data semua kelas per tingkat dan per jurusan this year
exports.readCount = (req, res, next) => {
    KelasModel.readCount((err, result) => {
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
            KelasModel.readCountTotal((err, result2) => {
                if (err) {
                    return res.status(500).send({
                        message: err
                    });
                } else {
                    var data = { total_kelas: result2, data_kelas: result };
                    return res.status(200).send({
                        message: data
                    });
                }
            });
        }
    });
}
// get daftar kelas per tingkat, jurusan , ptahun ajaran
exports.getDaftarKelas = (req, res, next) => {
    const data = new KelasModel({
        tingkat: req.body.tingkat,
        tahun_ajaran: req.body.tahun_ajaran,
        id_program_studi: req.body.id_program_studi
    });
    KelasModel.readDaftarKelasByTingkatTahunAjaranProgramStudi(data, (err, result) => {
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
            return res.status(200).send({
                message: result
            });
        }
    });
}
// get daftar kelas per guru per matkul
exports.getDaftarKelasPerguruPerMatpel = (req, res, next) => {
    KelasModel.readDaftarKelasPerGuruPengampuPermatpel(req.user.username, req.params.id_matpel, (err, result) => {
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
            var unique = [...new Map(result.map(item => [item['id'], item])).values()];
            return res.status(200).send({
                message: unique
            });
        }
    });
}

exports.updateWaliKelas = (req, res, next) => {
    const data = new KelasModel({
        id: req.params.id,
        wali_kelas: req.body.wali_kelas
    });
    KelasModel.updateWaliKelas(data, (err, result) => {
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
            return res.status(200).send({
                message: 'ok'
            });
        }
    });
}
exports.delete = (req, res, next) => {
    KelasModel.delete(req.params.id, (err, result) => {
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
            return res.status(200).send({
                message: 'ok'
            });
        }
    });
}
