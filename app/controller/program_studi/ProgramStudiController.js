const ProgramStudiModel = require("../../model/program_studi/ProgramStudiModel");
var uuid = require("uuid");

exports.create = (req, res, next) => {
    const data = new ProgramStudiModel({
        id: uuid.v4().substring(0, 10),
        nama_program_studi: req.body.nama_program_studi,
        deskripsi: req.body.deskripsi
    });
    ProgramStudiModel.create(data, (err, result) => {
        if (err) {
            if (err.kind === "redundan_data") {
                return res.status(409).send({
                    message: 'data_conflict'
                });
            }
            return res.status(500).send({
                message: err
            });
        } else {
            return res.status(201).send({
                message: 'ok'
            });
        }
    });
}
exports.read = (req, res, next) => {
    ProgramStudiModel.readAll((err, result) => {
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
exports.delete = (req, res, next) => {
    ProgramStudiModel.delete(req.params.id, (err, result) => {
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
                message: 'ok'
            });
        }
    });
}