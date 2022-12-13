const DataSiswaKelasModel = require("../../../model/kelas/daftar_siswa/KelasModel");

// insert siswa ke kelas
exports.create = (req, res, next) => {
    const data = new DataSiswaKelasModel({
        id_siswa: req.body.id_siswa,
        id_kelas: req.body.id_kelas
    });
    DataSiswaKelasModel.insert_siswa_to_kelas(data, (err, result) => {
        if (err) {
            if (err.kind === "redundan_data") {
                return res.status(409).send({
                    message: `data_conflict`
                });
            }
            return res.status(500).send({
                message: err
            });
        } else {
            return res.status(201).send({
                message: "insert siswa ke kelas sukses"
            });
        }
    });
}

// read data kelas per siswa by NIS
exports.read_data_kelas_persiswa = (req, res, next) => {
    DataSiswaKelasModel.read_data_kelas_persiswa(req.params.id_siswa, (err, result) => {
        if (err) {
            if (err.kind === "data_not_found") {
                return res.status(404).send({
                    message: `not_found`
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
// read daftar siswa per kelas by Id kelas
exports.read_daftar_siswa_perkelas = (req, res, next) => {
    DataSiswaKelasModel.daftar_siswa_perkelas(req.params.id, (err, result) => {
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
    })
}
