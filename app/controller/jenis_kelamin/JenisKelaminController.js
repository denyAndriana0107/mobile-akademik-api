const JenisKelaminModel = require("../../model/jenis_kelamin/JenisKelaminModel");

exports.readAll = (req, res, next) => {
    JenisKelaminModel.readAll((err, result) => {
        if (err) {
            if (err.kind === "data_not_found") {
                return res.status(404).send({
                    message: 'not_found'
                });
            }
            return res.status(500).send({
                message: err
            });
        }
        else {
            return res.status(200).send({
                message: result
            });
        }
    });
}
exports.readById = (req, res, next) => {
    JenisKelaminModel.readById(req.params.id, (err, result) => {
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
    });
}