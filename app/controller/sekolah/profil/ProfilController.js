const ProfilSekolahModel = require("../../../model/sekolah/profil/ProfilModel");

exports.update = (req, res, next) => {
    const data = new ProfilSekolahModel({
        nama_sekolah: req.body.nama_sekolah,
        tentang_sekolah: req.body.tentang_sekolah,
        akreditasi: req.body.akreditasi,
        alamat: req.body.alamat,
        phone: req.body.phone,
        email: req.body.email,
        foto: req.body.foto
    });
    ProfilSekolahModel.update(data, (err, result) => {
        if (err) {
            return res.status(500).send({
                message: err
            });
        } else {
            return res.status(200).send({
                message: "profil sekolah terupdate"
            });
        }
    });
}

exports.read = (req, res, next) => {
    ProfilSekolahModel.read((err, result) => {
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