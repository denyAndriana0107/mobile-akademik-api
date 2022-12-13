const { randomUUID } = require('crypto');
var uuid = require("uuid");
const GuruModel = require("../../model/guru/ProfilModel");


// create Guru profil
exports.insertProfilGuruModel = (req, res, next) => {
    const profilGuruModel = new GuruModel({
        id: randomUUID().substring(0, 10),
        nama_lengkap: req.body.nama_lengkap,
        NUPTK: req.body.NUPTK,
        jenis_kelamin: req.body.jenis_kelamin,
        tempat_lahir: req.body.tempat_lahir,
        tanggal_lahir: req.body.tanggal_lahir,
        agama: req.body.agama,
        alamat: req.body.alamat,
        phone: req.body.phone,
        email: req.body.email,
        id_guru: req.user.username
    });
    GuruModel.create(req.user.username, profilGuruModel, (err, result) => {
        if (err) {
            if (err.kind === "redundan_profil") {
                return res.status(409).send({
                    message: "data_conflict",
                });
            }
            return res.status(500).send({
                message:
                    err.message
            });
        }
        return res.status(200).send({
            message: "data insert sukses",
        });
    });
}
// read profil Guru by NIS
exports.findProfilGuruModelByNIP = (req, res, next) => {
    GuruModel.findProfilModelByNIP(req.params.id, (err, result) => {
        if (err) {
            if (err.kind === "data_not_found") {
                return res.status(404).send({
                    message: `not_found`
                });
            }
            return res.status(500).send({
                message: err
            });

        }
        return res.status(200).send(
            {
                message: result,
            }
        );

    });
};
// update profil ibu by NIS
exports.updateProfilGuruModelByNIP = (req, res, next) => {
    const updateProfilGuruModel = new GuruModel({
        nama_lengkap: req.body.nama_lengkap,
        NUPTK: req.body.NUPTK,
        jenis_kelamin: req.body.jenis_kelamin,
        tempat_lahir: req.body.tempat_lahir,
        tanggal_lahir: req.body.tanggal_lahir,
        agama: req.body.agama,
        alamat: req.body.alamat,
        phone: req.body.phone,
        email: req.body.email,
    });
    GuruModel.updateProfilModelByNIP(req.user.username, updateProfilGuruModel, (err, result) => {
        if (err) {
            if (err.kind === "data_not_found") {
                return res.status(404).send({
                    message: "not_found"
                });
            }
            return res.status(500).send({
                message:
                    err.message
            });
        }
        return res.status(200).send({
            message: "data update sukses",
        });
    });
}
exports.deleteProfilGuruModelByNIP = (req, res, next) => {
    GuruModel.deleteProfilModelByNIP(req.user.username, (err, result) => {
        if (err) {
            if (err.kind === "data_not_found") {
                return res.status(404).send({
                    message: "not_found"
                });
            }
            return res.status(500).send({
                message: err
            });
        }
        return res.status(200).send({
            message: `Delete suksus dengan NIP ${req.user.username}`
        });
    });
}