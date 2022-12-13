const DomisiliSiswaModel = require("../../model/siswa/DomisiliModel");
var uuid = require("uuid");

// ========= create =========
exports.insertDomisiliSiswa = (req, res, next) => {
    const domisili_siswa = new DomisiliSiswaModel({
        id: uuid.v4().substring(0, 10),
        provinsi: req.body.provinsi,
        kabupaten: req.body.kabupaten,
        kecamatan: req.body.kecamatan,
        kelurahan: req.body.kelurahan,
        RW: req.body.RW,
        RT: req.body.RT,
        alamat_lengkap: req.body.alamat_lengkap,
        id_siswa: req.user.username
    });
    DomisiliSiswaModel.insert(req.user.username, domisili_siswa, (err, result) => {
        if (err) {
            if (err.kind === "redundan_profil") {
                return res.status(409).send({
                    message: "data_conflict",
                });
            }
            return res.status(500).send({
                message: err
            });
        }
        return res.status(200).send({
            message: "data insert sukses",
        });
    });
}

// ========= read ===========
exports.findDomisiliSiswaByNIS = (req, res, next) => {
    DomisiliSiswaModel.findDomisiliSiswaByNIS(req.params.id, (err, result) => {
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

// ========== delete ========
exports.deleteDomisiliSiswaByNIS = (req, res, next) => {
    DomisiliSiswaModel.deleteDomisiliSiswaByNIS(req.user.username, (err, result) => {
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
                message: `data domisili siswa dengan NIS ${req.params.id} terhapus`
            });
        }
    });
}

// ========== update =========
exports.updateDomisiSiswaByNIS = (req, res, next) => {
    const updateDomisiliSiswa = new DomisiliSiswaModel({
        provinsi: req.body.provinsi,
        kabupaten: req.body.kabupaten,
        kecamatan: req.body.kecamatan,
        kelurahan: req.body.kelurahan,
        RW: req.body.RW,
        RT: req.body.RT,
        alamat_lengkap: req.body.alamat_lengkap
    });
    DomisiliSiswaModel.updateDomisiliSiswaByNIS(req.user.username, updateDomisiliSiswa, (err, result) => {
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
                message: `data domisili siswa dengan NIS ${req.user.username} terupdate`
            });
        }

    });
}