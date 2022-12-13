const database = require("../../config/db");
const ProfilModel = function (guru) {
    this.id = guru.id,
        this.nama_lengkap = guru.nama_lengkap,
        this.NUPTK = guru.NUPTK,
        this.jenis_kelamin = guru.jenis_kelamin,
        this.tempat_lahir = guru.tempat_lahir,
        this.tanggal_lahir = guru.tanggal_lahir,
        this.agama = guru.agama,
        this.alamat = guru.alamat,
        this.phone = guru.phone,
        this.email = guru.email,
        this.foto = guru.foto,
        this.id_guru = guru.id_guru
}
// create
ProfilModel.create = (id_guru, ProfilModel, result,) => {
    database.query(
        `SELECT id FROM profil_guru WHERE id_guru = ${id_guru}`, (err, results) => {
            if (err) {
                result(err);
                return;
            }
            if (results?.length) {
                result({ kind: "redundan_profil" }, null);
                return;
            } else {
                database.query(
                    `INSERT INTO profil_guru SET id = ?, nama_lengkap = ?,NUPTK = ?,jenis_kelamin = ?,tempat_lahir = ?,tanggal_lahir = ?
                    ,agama = ?,alamat = ?,phone =?,email = ?, id_guru = ?`,
                    [ProfilModel.id, ProfilModel.nama_lengkap, ProfilModel.NUPTK, ProfilModel.jenis_kelamin, ProfilModel.tempat_lahir,
                    ProfilModel.tanggal_lahir, ProfilModel.agama, ProfilModel.alamat, ProfilModel.phone, ProfilModel.email, ProfilModel.id_guru],
                    (err, res) => {
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

// +++ read +++
ProfilModel.findProfilModelByNIP = (id_guru, result) => {
    database.query(
        `SELECT profil_guru.id_guru, profil_guru.nama_lengkap, profil_guru.NUPTK, profil_jenis_kelamin.jenis_kelamin, 
        profil_guru.tempat_lahir, profil_guru.tanggal_lahir, profil_agama.agama, profil_guru.alamat, profil_guru.phone, 
        profil_guru.email, profil_guru.foto 
        FROM profil_guru 
        LEFT JOIN profil_jenis_kelamin ON profil_guru.jenis_kelamin = profil_jenis_kelamin.id 
        LEFT JOIN profil_agama ON profil_guru.agama = profil_agama.id
        WHERE id_guru = '${id_guru}';`,
        (err, results) => {
            if (err) {
                result(err);
                return;
            }
            if (!results?.length) {
                result({ kind: "data_not_found" }, null);
                return;
            } else {
                result(null, results);
                return;
            }
        }
    );
}

// modify
ProfilModel.updateProfilModelByNIP = (id_guru, profil, result) => {
    database.query(
        `SELECT id FROM profil_guru WHERE id_guru = '${id_guru}';`, (err, results) => {
            if (err) {
                result(err);
                return;
            }
            if (!results?.length) {
                result({ kind: "data_not_found" }, null);
                return;
            } else {
                database.query(
                    `UPDATE profil_guru SET nama_lengkap = ?,NUPTK = ?,jenis_kelamin = ?,tempat_lahir = ?,tanggal_lahir = ?
                    ,agama = ?,alamat = ?,phone =?,email = ?  WHERE id_guru = ${id_guru}`,
                    [profil.nama_lengkap, profil.NUPTK, profil.jenis_kelamin, profil.tempat_lahir,
                    profil.tanggal_lahir, profil.agama, profil.alamat, profil.phone, profil.email],
                    (err, res) => {
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
ProfilModel.uploadPhotoByNIP = (id, foto, result) => {
    database.query(
        `SELECT id FROM profil_guru WHERE id_guru ='${id}';`, (err, res) => {
            if (err) {
                result(err);
                return;
            }
            if (!res?.length) {
                result({ kind: "data_not_found" }, null);
                return;
            } else {
                database.query(
                    `UPDATE profil_guru SET foto = ? WHERE id_guru ='${id}';`,
                    [foto],
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
// delete
ProfilModel.deleteProfilModelByNIP = (id_guru, result) => {
    const withoutLineBreaks = id_guru.replace(/[\r\n]/gm, '');
    database.query(
        `SELECT id FROM profil_guru WHERE id_guru = '${withoutLineBreaks}';`, (err, results) => {
            if (err) {
                result(err);
                return;
            }
            if (!results?.length) {
                result({ kind: "data_not_found" }, null);
                return;
            } else {
                database.query(
                    `DELETE FROM profil_guru WHERE id_guru = "${withoutLineBreaks}"`, (err, res) => {
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
module.exports = ProfilModel;