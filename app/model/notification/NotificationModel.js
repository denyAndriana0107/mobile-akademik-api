const database = require("../../config/db");
const firebase = require("../../config/firebase/notification/firebase");
const NotificationModel = function (data) {
    this.id = data.id,
        this.userId = data.userId,
        this.token = data.token,
        this.createAt = data.createAt,
        this.updateAt = data.updateAt
}
// ====================== create ===============
NotificationModel.create = (data, result) => {
    database.query(
        `SELECT id FROM notification WHERE userId = '${data.userId}';`,
        (err, res) => {
            if (err) {
                result(err);
                return;
            }
            if (res?.length) {
                result({ kind: "redundan_data" }, null);
                return;
            } else {
                database.query(
                    `INSERT INTO notification SET ?`, data, (err, res2) => {
                        if (err) {
                            result(err);
                            return;
                        } else {
                            result(null);
                            return;
                        }
                    }
                );
            }
        }
    );
}
NotificationModel.createMessageToDevice = (data, result) => {
    const registrationToken = data.token;
    const message = {
        notification: {
            title: data.title,
            body: data.body
        },
    };
    firebase.messaging().sendToDevice(registrationToken, message)
        .then(response => {
            result(null);
        })
        .catch(error => {
            result(error);
        });
}
NotificationModel.createMessageToAll = (data, result) => {
    const message = {
        notification: {
            title: data.title,
            body: data.body
        },
        topic: data.topic
    };
    firebase.messaging().send(message)
        .then(response => {
            result(null);
        })
        .catch(error => {
            result(error);
        });
}
// ============================= read ====================
NotificationModel.readByNIS = (userId, result) => {
    database.query(
        `SELECT notification.id,notification.userId,notification.token 
        FROM notification
        WHERE notification.userId = '${userId}';`, (err, res) => {
        if (err) {
            result(err);
            return;
        }
        if (!res?.length) {
            result({ kind: "data_not_found" }, null);
            return;
        } else {
            result(null, res);
            return;
        }
    }
    );
}
NotificationModel.updateToken = (data, result) => {
    database.query(
        `SELECT id FROM notification WHERE userId = '${data.userId}';`, (err, res) => {
            if (err) {
                result(err);
                return;
            }
            if (!res?.length) {
                result({ kind: "data_not_found" }, null);
                return;
            } else {
                database.query(
                    `UPDATE notification SET token = ?, updateAt = ?
                    WHERE notification.userId = '${data.userId}'`,
                    [data.token, data.updateAt],
                    (err, res2) => {
                        if (err) {
                            result(err);
                            return;
                        } else {
                            result(null);
                            return;
                        }
                    }
                );
            }
        }
    );
}

// ========================= delete =====================
NotificationModel.delete = (userId, result) => {
    database.query(
        `SELECT id FROM notification WHERE userId = '${userId}';`, (err, res) => {
            if (err) {
                result(err);
                return;
            }
            if (!res?.length) {
                result({ kind: "data_not_found" }, null);
                return;
            } else {
                database.query(
                    `DELETE FROM notification WHERE notification.userId = '${userId}';`,
                    (err, res2) => {
                        if (err) {
                            result(err);
                            return;
                        } else {
                            result(null);
                            return;
                        }
                    }
                );
            }
        }
    );
}

module.exports = NotificationModel;