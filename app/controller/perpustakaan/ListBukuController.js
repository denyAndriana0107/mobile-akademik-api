const BukuModel = require("../../model/perpustakaan/ListBukuModel");
var uuid = require("uuid");

// ================= insert ========================
exports.insert = (req, res, next) => {
    const buku = new BukuModel({
        id: uuid.v4().substring(0, 10),
        judul: req.body.judul,
        ISBN: req.body.ISBN,
        deskripsi_buku: req.body.deskripsi_buku,
        penulis: req.body.penulis,
        penerbit: req.body.penerbit,
        tahun_terbit: req.body.tahun_terbit,
        program_studi: req.body.program_studi
    });
    BukuModel.create(buku, (err, result) => {
        if (err) {
            if (err.kind === "redundan_data") {
                return res.status(409).send({
                    message: "data_conflict"
                });
            }
            return res.status(500).send({
                message: err
            });
        } else {
            return res.status(200).send({
                message: "insert buku sukses"
            });
        }
    });
}

// ================ read ==========================
exports.getAll = (req, res, next) => {
    BukuModel.getAll((err, result) => {
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
exports.findByID = (req, res, next) => {
    BukuModel.findById(req.params.id, (err, result) => {
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
exports.findBySearch = (req, res, next) => {
    BukuModel.findBySearch(req.params.keyword, (err, result) => {
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
//================= update ======================
exports.updateBuku = (req, res, next) => {
    const buku = new BukuModel({
        judul: req.body.judul,
        ISBN: req.body.ISBN,
        deskripsi_buku: req.body.deskripsi_buku,
        penulis: req.body.penulis,
        penerbit: req.body.penerbit,
        tahun_terbit: req.body.tahun_terbit,
        program_studi: req.body.program_studi
    });
    BukuModel.updateBuku(req.params.id, buku, (err, result) => {
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
                message: "update buku sukses"
            });
        }
    });
}

// =================== delete ===================
exports.delete = (req, res, next) => {
    BukuModel.delete(req.params.id, (err, result) => {
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
                message: "delete buku sukses"
            });
        }
    });
}