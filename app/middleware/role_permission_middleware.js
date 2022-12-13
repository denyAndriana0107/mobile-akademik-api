const e = require("express");
const database = require("../config/db");
require("dotenv").config();
module.exports = {
    isAdmin: (req, res, next) => {
        database.query(
            `SELECT auth_group_users.id_auth_groups as role FROM auth_group_users 
            LEFT JOIN auth_groups ON auth_group_users.id_auth_groups = auth_groups.id 
            LEFT JOIN auth_users ON auth_group_users.id_auth_users = auth_users.id 
            WHERE auth_users.username = '${req.user.username}'`,
            (err, result) => {
                if (err) {
                    return res.status(500).send({
                        err
                    });
                }
                else {
                    var role = result[0]['role'];
                    if (process.env.ROLE_APP_ADMIN == role) {
                        next();
                    } else {
                        return res.status(403).send({
                            message: `access denied`
                        });
                    }
                }

            }
        );
    },
    isGuru: (req, res, next) => {
        database.query(
            `SELECT auth_group_users.id_auth_groups as role FROM auth_group_users 
            LEFT JOIN auth_groups ON auth_group_users.id_auth_groups = auth_groups.id 
            LEFT JOIN auth_users ON auth_group_users.id_auth_users = auth_users.id 
            WHERE auth_users.username = '${req.user.username}'`,
            (err, result) => {
                if (err) {
                    return res.status(500).send({
                        err
                    });
                }
                else {
                    var role = result[0]['role'];
                    if (process.env.ROLE_APP_GURU == role) {
                        next();
                    } else {
                        return res.status(403).send({
                            message: `access denied`
                        });
                    }
                }

            }
        );
    },
    isSiswa: (req, res, next) => {
        database.query(
            `SELECT auth_group_users.id_auth_groups as role FROM auth_group_users 
            LEFT JOIN auth_groups ON auth_group_users.id_auth_groups = auth_groups.id 
            LEFT JOIN auth_users ON auth_group_users.id_auth_users = auth_users.id 
            WHERE auth_users.username = '${req.user.username}'`,
            (err, result) => {
                if (err) {
                    return res.status(500).send({
                        err
                    });
                }
                else {
                    var role = result[0]['role'];
                    if (process.env.ROLE_APP_SISWA == role) {
                        next();
                    } else {
                        return res.status(403).send({
                            message: "access denied"
                        });
                    }
                }

            }
        );
    },
    isStaff: (req, res, next) => {
        database.query(
            `SELECT auth_group_users.id_auth_groups as role FROM auth_group_users 
            LEFT JOIN auth_groups ON auth_group_users.id_auth_groups = auth_groups.id 
            LEFT JOIN auth_users ON auth_group_users.id_auth_users = auth_users.id 
            WHERE auth_users.username = '${req.user.username}'`,
            (err, result) => {
                if (err) {
                    return res.status(500).send({
                        err
                    });
                }
                else {
                    var role = result[0]['role'];
                    if (process.env.ROLE_APP_STAFF == role) {
                        next();
                    } else {
                        return res.status(403).send({
                            message: "access denied"
                        });
                    }
                }

            }
        );
    },
    isOrangTua: (req, res, next) => {
        database.query(
            `SELECT auth_group_users.id_auth_groups as role FROM auth_group_users 
            LEFT JOIN auth_groups ON auth_group_users.id_auth_groups = auth_groups.id 
            LEFT JOIN auth_users ON auth_group_users.id_auth_users = auth_users.id 
            WHERE auth_users.username = '${req.user.username}'`,
            (err, result) => {
                if (err) {
                    return res.status(500).send({
                        err
                    });
                }
                else {
                    var role = result[0]['role'];
                    if (process.env.ROLE_APP_ORANGTUA == role) {
                        next();
                    } else {
                        return res.status(403).send({
                            message: "access denied"
                        });
                    }
                }

            }
        );
    },
}