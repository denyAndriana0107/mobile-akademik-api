const AuthModel = require("../../model/auth/AuthModel");
const SiswaModel = require("../../model/siswa/SiswaModel");
const GuruModel = require("../../model/guru/GuruModel");
const bcrypt = require("bcryptjs");
const { randomUUID } = require('crypto');
var uuid = require("uuid");


// TimeStamp
let date_ob = new Date();
let date = ("0" + date_ob.getDate()).slice(-2);
let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
let year = date_ob.getFullYear();
let hours = date_ob.getHours();
let minutes = date_ob.getMinutes();
let seconds = date_ob.getSeconds();
let timestamp = year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds;

//sign Up User 
exports.signUp = (req, res, next) => {
    if (!req.body) {
        res.status(400).send({
            message: "Field harus diisi"
        });
    }
    //encrypt password
    const passwordHash = bcrypt.hashSync(req.body.password, 10);
    const passwordHashWali = bcrypt.hashSync(req.body.password, 10);

    const newUser = new AuthModel({
        id: uuid.v4().substring(0, 10),
        username: req.body.username,
        password: passwordHash,
        registered: timestamp,
        last_login: null,
    });
    const newUserWali = new AuthModel({
        id: uuid.v4().substring(0, 10),
        username: "wali_" + req.body.username,
        password: passwordHashWali,
        registered: timestamp,
        last_login: null,
    });
    const siswa = new SiswaModel({
        id: uuid.v4().substring(0, 10),
        username: req.body.username,
        status_akademik: 1
    });
    AuthModel.signUp(newUser, (err, result) => {
        if (err) {
            if (err.kind === "users_duplikat") {
                return res.status(200).send({
                    message: `username ${newUser.username} telah digunakan`
                });
            } else {
                return res.status(500).send({
                    message:
                        err.message || "Some error occurred while creating the new User."
                });
            }
        } else {
            SiswaModel.create(siswa, (err, result) => {
                if (err) {
                    return res.status(500).send({
                        message: `internal server error ${err}`
                    });
                } else {
                    AuthModel.signUpWali(newUserWali, (err, result) => {
                        if (err) {
                            if (err.kind === "users_duplikat") {
                                return res.status(200).send({
                                    message: `username ${newUserWali.username} telah digunakan`
                                });
                            } else {
                                return res.status(500).send({
                                    message:
                                        err.message || "Some error occurred while creating the new User."
                                });
                            }
                        } else {
                            return res.status(200).send({
                                message: "registered"
                            });
                        }
                    });
                }
            });
        }
    });
}
// signUp Guru
exports.signUpGuru = (req, res, next) => {
    if (!req.body) {
        res.status(400).send({
            message: "Field harus diisi"
        });
    }
    //encrypt password
    const passwordHash = bcrypt.hashSync(req.body.password, 10);

    const newUser = new AuthModel({
        id: uuid.v4().substring(0, 10),
        username: req.body.username,
        password: passwordHash,
        registered: timestamp,
        last_login: null,
    });
    const guru = new GuruModel({
        id: uuid.v4().substring(0, 10),
        username: req.body.username,
        status_guru: 1
    });
    AuthModel.signUpGuru(newUser, (err, result) => {
        if (err) {
            if (err.kind === "users_duplikat") {
                return res.status(200).send({
                    message: `username ${newUser.username} telah digunakan`
                });
            } else {
                return res.status(500).send({
                    message:
                        err.message || "Some error occurred while creating the new User."
                });
            }
        } else {
            GuruModel.create(guru, (err, result2) => {
                if (err) {
                    return res.status(500).send({
                        message: `internal server error ${err}`
                    });
                } else {
                    return res.status(200).send({
                        message: "registered"
                    });
                }
            });
        }
    });

}
// sign up Staff
exports.signUpStaff = (req, res, next) => {
    if (!req.body) {
        res.status(400).send({
            message: "Field harus diisi"
        });
    }
    //encrypt password
    const passwordHash = bcrypt.hashSync(req.body.password, 10);

    const newUser = new AuthModel({
        id: uuid.v4().substring(0, 10),
        username: req.body.username,
        password: passwordHash,
        registered: timestamp,
        last_login: null,
    });
    AuthModel.signUpStaff(newUser, (err, result) => {
        if (err) {
            if (err.kind === "users_duplikat") {
                return res.status(200).send({
                    message: `username ${newUser.username} telah digunakan`
                });
            } else {
                return res.status(500).send({
                    message:
                        err.message || "Some error occurred while creating the new User."
                });
            }
        } else {
            return res.status(200).send({
                message: "registered"
            });
        }
    });
}
// sign In User
exports.signIn = (req, res, next) => {
    if (!req.body) {
        res.status(400).send({
            message: "Field harus diisi"
        });
    }

    const user = new AuthModel({
        username: req.body.username,
        password: req.body.password,
        last_login: timestamp,
    });

    AuthModel.signIn(user, (err, result) => {
        if (err) {
            if (err.kind === "users_not_found") {
                res.status(404).send({
                    message: `user dengan username ${user.username} tidak ditemukan`
                });
            }
            else if (err.kind === "users_incorrect") {
                res.status(403).send({
                    message: `username atau password salah`
                });
            }
            else {
                return res.status(500).send({
                    message:
                        err.message || "Server Error"
                });
            }
        } else {
            AuthModel.getRoleUser(user.username, (err, result2) => {
                if (err) {
                    return res.status(500).send({
                        message: err
                    });
                } else {
                    return res.status(200).send({
                        message: "logged in",
                        role: result2[0]['role'],
                        token: `${result}`
                    });
                }
            });

        }
    });
}