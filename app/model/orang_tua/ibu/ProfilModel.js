const database = require("../../../config/db");

const ProfilIbu = function (ibu) {
    this.id = ibu.id,
        this.nama_lengkap = ibu.nama_lengkap,
        this.NIK = ibu.NIK,
        this.tempat_lahir = ibu.tempat_lahir,
        this.tanggal_lahir = ibu.tanggal_lahir,
        this.agama = ibu.agama,
        this.status_hidup = ibu.status_hidup,
        this.status_kekerabatan = ibu.status_kekerabatan,
        this.pendidikan_terakhir = ibu.pendidikan_terakhir,
        this.penghasilan = ibu.penghasilan,
        this.alamat = ibu.alamat,
        this.phone = ibu.phone,
        this.email = ibu.email,
        this.id_siswa = ibu.id_siswa
}

// ================== create =====================
ProfilIbu.create = (id_siswa, profilIbu, result,) => {
    database.query(
        `SELECT id FROM profil_ibu WHERE id_siswa = ${id_siswa}`, (err, results) => {
            if (err) {
                result(err);
                return;
            }
            if (results?.length) {
                result({ kind: "redundan_profil" }, null);
                return;
            } else {
                database.query(
                    `INSERT INTO profil_ibu SET ?`, profilIbu, (err, res) => {
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

// ================== read ======================
ProfilIbu.findProfilIbuByNIS = (id_siswa, result) => {
    database.query(
        `SELECT nama_lengkap, NIK, tempat_lahir, tanggal_lahir, profil_agama.agama, status_hidup, status_kekerabatan, pendidikan_terakhir, penghasilan, alamat, phone, email
        FROM profil_ibu 
        LEFT JOIN profil_agama ON profil_ibu.agama = profil_agama.id
        WHERE id_siswa = "${id_siswa}";`, (err, results) => {
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

// ==================== modify ========================
ProfilIbu.updateProfilIbuByNIS = (id_siswa, profil, result) => {
    database.query(
        `SELECT id FROM profil_ibu WHERE id_siswa = '${id_siswa}';`, (err, results) => {
            if (err) {
                result(err);
                return;
            }
            if (!results?.length) {
                result({ kind: "data_not_found" }, null);
                return;
            } else {
                database.query(
                    `UPDATE profil_ibu SET nama_lengkap = ?,NIK = ?, tempat_lahir = ?,tanggal_lahir = ?
                    ,agama = ?,status_hidup = ?, status_kekerabatan = ?,pendidikan_terakhir	= ?, penghasilan = ?,alamat = ?,phone =?,email = ?  WHERE id_siswa = ${id_siswa}`,
                    [profil.nama_lengkap, profil.NIK, profil.tempat_lahir, profil.tanggal_lahir, profil.agama,
                    profil.status_hidup, profil.status_kekerabatan, profil.pendidikan_terakhir, profil.penghasilan, profil.alamat, profil.phone, profil.email],
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
// ======================== delete ====================
ProfilIbu.deleteProfilIbuByNIS = (id_siswa, result) => {
    const withoutLineBreaks = id_siswa.replace(/[\r\n]/gm, '');
    database.query(
        `SELECT id FROM profil_ibu WHERE id_siswa = '${withoutLineBreaks}';`, (err, results) => {
            if (err) {
                result(err);
                return;
            }
            if (!results?.length) {
                result({ kind: "data_not_found" }, null);
                return;
            } else {
                database.query(
                    `DELETE FROM profil_ibu WHERE id_siswa = "${withoutLineBreaks}"`, (err, res) => {
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
module.exports = ProfilIbu;