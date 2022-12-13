const NotificationModel = require("../../model/notification/NotificationModel");
var uuid = require("uuid");
const firebase = require("../../config/firebase/notification/firebase");
const timestamps = require("../../helper/GetTimeStamps");

exports.pushToken = (req, res, next) => {
    NotificationModel.readByNIS(req.user.username, (err, result) => {
        if (err) {
            if (err.kind === "data_not_found") {
                const data = new NotificationModel({
                    id: uuid.v4().substring(0, 10),
                    userId: req.user.username,
                    token: req.body.token,
                    createAt: timestamps.timestamp()
                });
                NotificationModel.create(data, (err, result) => {
                    if (err) {
                        return res.status(500).send({
                            message: err
                        });
                    } else {
                        return res.status(201).send({
                            message: 'ok'
                        });
                    }
                });
            } else {
                return res.status(500).send({
                    message: err
                });
            }
        } else {
            const data = new NotificationModel({
                id: uuid.v4().substring(0, 10),
                userId: req.user.username,
                token: req.body.token,
                updateAt: timestamps.timestamp()
            });
            NotificationModel.updateToken(data, (err, result) => {
                if (err) {
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
    });



}
exports.readByNIS = (req, res, next) => {
    NotificationModel.readByNIS(req.user.username, (err, result) => {
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
    NotificationModel.delete(req.user.username, (err, result) => {
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


