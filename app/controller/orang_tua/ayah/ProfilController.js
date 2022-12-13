const AyahReferences = require("../../../model/orang_tua/ayah/ProfilModel");
var uuid = require("uuid");

// create Ayah profil
exports.insertProfilAyah = (req, res, next) => {
    const profilAyah = new AyahReferences({
        id: uuid.v4().substring(0, 10),
        nama_lengkap: req.body.nama_lengkap,
        NIK: req.body.NIK,
        tempat_lahir: req.body.tempat_lahir,
        tanggal_lahir: req.body.tanggal_lahir,
        agama: req.body.agama,
        status_hidup: req.body.status_hidup,
        status_kekerabatan: req.body.status_kekerabatan,
        pendidikan_terakhir: req.body.pendidikan_terakhir,
        penghasilan: req.body.penghasilan,
        alamat: req.body.alamat,
        phone: req.body.phone,
        email: req.body.email,
        id_siswa: req.params.id.replace(/[\r\n]/gm, ''),
    });
    AyahReferences.create(req.params.id, profilAyah, (err, result) => {
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

// read profil Ayah by NIS
exports.findProfilAyahByNIS = (req, res, next) => {
    AyahReferences.findProfilAyahByNIS(req.params.id, (err, result) => {
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

// update profil Ayah by NIS
exports.updateProfilAyahByNIS = (req, res, next) => {
    const updateProfilAyah = new AyahReferences({
        nama_lengkap: req.body.nama_lengkap,
        NIK: req.body.NIK,
        tempat_lahir: req.body.tempat_lahir,
        tanggal_lahir: req.body.tanggal_lahir,
        agama: req.body.agama,
        status_hidup: req.body.status_hidup,
        status_kekerabatan: req.body.status_kekerabatan,
        pendidikan_terakhir: req.body.pendidikan_terakhir,
        penghasilan: req.body.penghasilan,
        alamat: req.body.alamat,
        phone: req.body.phone,
        email: req.body.email
    });
    AyahReferences.updateProfilAyahByNIS(req.params.id, updateProfilAyah, (err, result) => {
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

exports.deleteProfilAyahByNIS = (req, res, next) => {
    AyahReferences.deleteProfilAyahByNIS(req.params.id, (err, result) => {
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
            message: `Delete suksus dengan NIS ${req.params.id}`
        });
    });
}