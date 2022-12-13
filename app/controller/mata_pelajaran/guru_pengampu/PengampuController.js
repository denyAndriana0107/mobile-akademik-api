const PengampuModel = require("../../../model/mata_pelajaran/guru_pengampu/PengampuModel");

// ================ create ==============
exports.insert = (req, res, next) => {
    const newPengampu = new PengampuModel({
        id_matpel: req.body.id_matpel,
        id_guru: req.body.id_guru
    });
    PengampuModel.insert(newPengampu, (err, result) => {
        if (err) {
            if (err.kind === "redundan_data") {
                return res.status(200).send({
                    message: "data duplikat"
                });
            }
            return res.status(500).send({
                message: "server error"
            });
        } else {
            return res.status(200).send({
                message: "data guru pengampu berhasil diinput"
            })
        }
    });
}
// ================ read ===============
exports.getAll = (req, res, next) => {
    PengampuModel.getAll((err, result) => {
        if (err) {
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
exports.readMatPelPerGuruPengampu = (req, res, next) => {
    PengampuModel.getMataPelajaranByGuruPengampu(req.params.id, (err, result) => {
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