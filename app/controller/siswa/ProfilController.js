const SiswaProfilModel = require("../../model/siswa/ProfilModel");
var uuid = require("uuid");

// ========= create ============
exports.insertProfilSiswa = (req, res, next) => {
    const profil_siswa = new SiswaProfilModel({
        id: uuid.v4().substring(0, 10),
        nama_lengkap: req.body.nama_lengkap,
        periode_masuk: '20' + req.user.username.replace(/[\r\n]/gm, '').substring(0, 2),
        // status_akademik: null,
        jenis_kelamin: req.body.jenis_kelamin,
        tempat_lahir: req.body.tempat_lahir,
        tanggal_lahir: req.body.tanggal_lahir,
        agama: req.body.agama,
        alamat: req.body.alamat,
        phone: req.body.phone,
        email: req.body.email,
        id_siswa: req.user.username,
        id_program_studi: req.body.id_program_studi,
    });
    SiswaProfilModel.insert(req.user.username, profil_siswa, (err, result) => {
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
// ========= Read =============
exports.findProfilByNIS = (req, res, next) => {
    SiswaProfilModel.findProfilByNIS(req.params.id, (err, result) => {
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
// ========= delete ==========
exports.deleteProfilByNis = (req, res, next) => {
    SiswaProfilModel.deleteProfilByNIS(req.user.username, (err, result) => {
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
            message: `Deleted`
        });
    });
}
// ========= update ==========
exports.updateProfilByNIS = (req, res, next) => {
    const updateProfil = new SiswaProfilModel({
        nama_lengkap: req.body.nama_lengkap,
        jenis_kelamin: req.body.jenis_kelamin,
        tempat_lahir: req.body.tempat_lahir,
        tanggal_lahir: req.body.tanggal_lahir,
        agama: req.body.agama,
        phone: req.body.phone,
        email: req.body.email,
        id_program_studi: req.body.id_program_studi
    });
    SiswaProfilModel.updateProfilByID(req.user.username, updateProfil, (err, result) => {
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
