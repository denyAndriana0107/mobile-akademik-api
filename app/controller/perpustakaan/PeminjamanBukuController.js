const PeminjamanBukuModel = require("../../model/perpustakaan/PeminjamanBukuModel");
var uuid = require("uuid");
// ================ insert ===============
exports.create = (req, res, next) => {
    const peminjaman = new PeminjamanBukuModel({
        id: uuid.v4().substring(0, 10),
        id_buku: req.body.id_buku,
        tanggal_peminjaman: req.body.tanggal_peminjaman,
        tanggal_pengembalian: req.body.tanggal_pengembalian,
        id_siswa: req.body.id_siswa
    });
    PeminjamanBukuModel.create(peminjaman, (err, result) => {
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
            return res.status(201).send({
                message: "insert data peminjaman buku sukses"
            });
        }
    });
}
// ================ read =================
exports.getAll = (req, res, next) => {
    PeminjamanBukuModel.getAll((err, result) => {
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
exports.findByNISSiswa = (req, res, next) => {
    PeminjamanBukuModel.findByNISSiswa(req.params.id, (err, result) => {
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

// ==================== update =================
exports.updatePeminjamanBuku = (req, res, next) => {
    const peminjaman_buku = new PeminjamanBukuModel({
        id: req.params.id,
        status_peminjaman: req.body.status_peminjaman,
        peminjaman_expired: req.body.peminjaman_expired,
        status_pengembalian_buku: req.body.status_pengembalian_buku
    });
    PeminjamanBukuModel.updateStatusPengembalianBuku(peminjaman_buku, (err, result) => {
        if (err) {
            if (err.kind == "data_not_found") {
                return res.status(404).send({
                    message: 'not_found'
                });
            }
            return res.status(500).send({
                message: err
            });
        } else {
            return res.status(200).send({
                message: 'update sukses'
            });
        }
    });
}
// ===================== delete ================
exports.delete = (req, res, next) => {
    PeminjamanBukuModel.delete(req.params.id, (err, result) => {
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
                message: "data peminjaman buku terhapus"
            });
        }
    });
}