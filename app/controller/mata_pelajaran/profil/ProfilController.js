const MataPelajaranModel = require("../../../model/mata_pelajaran/profil/ProfilModel");
var uuid = require("uuid");

// =========== create ===============
exports.insertMatPel = (req, res, next) => {
    const newMataPelajaran = new MataPelajaranModel({
        id: uuid.v4().substring(0, 10),
        nama_pelajaran: req.body.nama_pelajaran,
        tingkat: req.body.tingkat,
        sks: req.body.sks,
        kategori: req.body.kategori,
    });

    MataPelajaranModel.create(newMataPelajaran, (err, result) => {
        if (err) {
            if (err.kind === "data_redundan") {
                return res.status(409).send({
                    message: "data_conflict"
                });
            }
            return res.status(500).send({
                message: err
            });
        } else {
            return res.status(200).send({
                message: "insert sukses"
            });
        }
    });
}

// ============ read =========== 
exports.readAll = (req, res, next) => {
    MataPelajaranModel.readAll((err, result) => {
        if (err) {
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
exports.findById = (req, res, next) => {
    MataPelajaranModel.findById(req.params.id, (err, result) => {
        if (err) {
            if (err.kind === "data_not_found") {
                return res.status(404).send({
                    message: `not_found`
                });
            }
            return res.status(500).send({
                message: "server error"
            });
        } else {
            return res.status(200).send({
                message: result
            });
        }
    });
}

// =========== delete ===========
exports.deleteById = (req, res, next) => {
    MataPelajaranModel.deleteById(req.params.id, (err, result) => {
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
                message: `data mata pelajaran dengan id ${req.params.id} terhapus`
            })
        }
    });
}
// ========== update ============
exports.updateById = (req, res, next) => {
    const mataPelajaran = new MataPelajaranModel({
        nama_pelajaran: req.body.nama_pelajaran,
        tingkat: req.body.tingkat,
        sks: req.body.sks,
        kategori: req.body.kategori,
    });
    MataPelajaranModel.updateById(req.params.id, mataPelajaran, (err, result) => {
        if (err) {
            if (err.kind === "data_not_found") {
                return res.status(404).send({
                    message: `not_found`
                });
            }
            if (err.kind === "data_redundan") {
                return res.status(409).send({
                    message: `data_conflict`
                });
            }
            return res.status(500).send({
                message: err
                // message: err
            });
        } else {
            return res.status(200).send({
                message: `data mata pelajaran dengan id ${req.params.id} terupdate`
            })
        }
    });
}