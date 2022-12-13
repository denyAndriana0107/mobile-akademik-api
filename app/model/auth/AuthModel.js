const database = require("../../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// konstruktor
const Auth = function (auth) {
    this.id = auth.id,
        this.username = auth.username,
        this.password = auth.password,
        this.registered = auth.registered,
        this.last_login = auth.last_login
}

// ======== Sign Up new User ===========
Auth.signUp = (newUser, result) => {
    const recentId = newUser.id;
    database.query(
        `SELECT id FROM auth_users WHERE LOWER(username) = LOWER('${newUser.username}')`,
        (err, results) => {
            if (results?.length) {
                result({ kind: "users_duplikat" }, null);
                return;
            } else {
                // insert new users
                database.query(
                    `INSERT INTO auth_users SET ? `, newUser, (err, res) => {
                        if (err) {
                            result(err);
                            return;
                        } else {
                            //  insert role users
                            database.query(
                                `INSERT INTO auth_group_users (id_auth_users ,id_auth_groups) VALUES ('${recentId}','${process.env.ROLE_APP_SISWA}')`,
                                (err, results) => {
                                    if (err) {
                                        result(err);
                                        return;
                                    } else {
                                        result(null)
                                        return;
                                    }
                                }
                            );
                        }
                    }
                );
            }
        }
    );
}
Auth.signUpWali = (newUser, result) => {
    const recentId = newUser.id;
    // cek duplikasi akun
    database.query(
        `SELECT id FROM auth_users WHERE LOWER(username) = LOWER('wali_${newUser.username}')`,
        (err, results) => {
            if (results?.length) {
                result({ kind: "users_duplikat" }, null);
                return;
            } else {
                // insert new users
                database.query(
                    `INSERT INTO auth_users SET ? `, newUser, (err, res) => {
                        if (err) {
                            result(err);
                            return;
                        } else {
                            //  insert role users
                            database.query(
                                `INSERT INTO auth_group_users (id_auth_users ,id_auth_groups) VALUES ('${recentId}','${process.env.ROLE_APP_ORANGTUA}')`,
                                (err, results) => {
                                    if (err) {
                                        result(err);
                                        return;
                                    } else {
                                        result(null)
                                        return;
                                    }
                                }
                            );
                        }
                    }
                );
            }
        }
    );
}
Auth.signUpGuru = (newUser, result) => {
    const recentId = newUser.id;
    // cek duplikasi akun
    database.query(
        `SELECT id FROM auth_users WHERE LOWER(username) = LOWER('${newUser.username}')`,
        (err, results) => {
            if (err) {
                result(err);
                return;
            }
            if (results?.length) {
                result({ kind: "users_duplikat" }, null);
                return;
            } else {
                // insert new users
                database.query(
                    `INSERT INTO auth_users SET ? `, newUser, (err, res) => {
                        if (err) {
                            result(err);
                            return;
                        } else {
                            //  insert role users
                            database.query(
                                `INSERT INTO auth_group_users (id_auth_users ,id_auth_groups) VALUES ('${recentId}','${process.env.ROLE_APP_GURU}')`,
                                (err, results) => {
                                    if (err) {
                                        result(err);
                                        return;
                                    } else {
                                        result(null)
                                        return;
                                    }
                                }
                            );
                        }
                    }
                );
            }
        }
    );
}
Auth.signUpStaff = (newUser, result) => {
    const recentId = newUser.id;
    // cek duplikasi akun
    database.query(
        `SELECT id FROM auth_users WHERE LOWER(username) = LOWER('${newUser.username}')`,
        (err, results) => {
            if (err) {
                result(err);
                return;
            }
            if (results?.length) {
                result({ kind: "users_duplikat" }, null);
                return;
            } else {
                // insert new users
                database.query(
                    `INSERT INTO auth_users SET ? `, newUser, (err, res) => {
                        if (err) {
                            result(err);
                            return;
                        } else {
                            //  insert role users
                            database.query(
                                `INSERT INTO auth_group_users (id_auth_users ,id_auth_groups) VALUES ('${recentId}','${process.env.ROLE_APP_STAFF}')`,
                                (err, results) => {
                                    if (err) {
                                        result(err);
                                        return;
                                    } else {
                                        result(null)
                                        return;
                                    }
                                }
                            );
                        }
                    }
                );
            }
        }
    );
}

// ======== Sign In User ============
Auth.signIn = (user, result) => {
    database.query(
        `SELECT  auth_users.username,auth_users.password FROM auth_users WHERE username = '${user.username}' `,
        (err, results) => {
            if (err) {
                result(err);
                return;
            }
            if (!results?.length) {
                result({ kind: "users_not_found" }, null);
                return;
            } else {
                bcrypt.compare(
                    user.password,
                    results[0]["password"],
                    (berr, bresult) => {
                        if (berr) {
                            result({ kind: "users_incorrect" }, null);
                            return;
                        }
                        if (bresult) {
                            const token = jwt.sign(
                                {
                                    username: results[0].username,
                                    userId: results[0].id,
                                },
                                "SECRETKEY",
                                // { expiresIn: "7d" }
                                {}
                            );
                            database.query(
                                `UPDATE auth_users SET last_login = '${user.last_login}' WHERE username = '${results[0].username}';`,
                                (err, res) => {
                                    if (err) {
                                        result(err);
                                        return;
                                    } else {
                                        result(null, token);
                                        return;
                                    }
                                }
                            );
                        } else {
                            result({ kind: "users_incorrect" }, null);
                            return;
                        }
                    }
                );
            }

        }
    );
}
// =========
Auth.getRoleUser = (username, result) => {
    database.query(
        `SELECT auth_groups.name as role FROM auth_group_users 
        LEFT JOIN auth_groups ON auth_group_users.id_auth_groups = auth_groups.id 
        LEFT JOIN auth_users ON auth_group_users.id_auth_users = auth_users.id 
        WHERE auth_users.username = '${username}'`, (err, res) => {
        if (err) {
            result(err);
            return;
        } else {
            result(null, res);
            return;
        }
    }
    );
}
module.exports = Auth;