const database = require("../../../config/db");

const ProfilAyah = function (ayah) {
    this.id = ayah.id,
        this.nama_lengkap = ayah.nama_lengkap,
        this.NIK = ayah.NIK,
        this.tempat_lahir = ayah.tempat_lahir,
        this.tanggal_lahir = ayah.tanggal_lahir,
        this.agama = ayah.agama,
        this.status_hidup = ayah.status_hidup,
        this.status_kekerabatan = ayah.status_kekerabatan,
        this.pendidikan_terakhir = ayah.pendidikan_terakhir,
        this.penghasilan = ayah.penghasilan,
        this.alamat = ayah.alamat,
        this.phone = ayah.phone,
        this.email = ayah.email,
        this.id_siswa = ayah.id_siswa
}

// ================== create =====================
ProfilAyah.create = (id_siswa, profilayah, result,) => {
    database.query(
        `SELECT id FROM profil_ayah WHERE id_siswa = ${id_siswa}`, (err, results) => {
            if (err) {
                result(err);
                return;
            }
            if (results?.length) {
                result({ kind: "redundan_profil" }, null);
                return;
            } else {
                database.query(
                    `INSERT INTO profil_ayah SET ?`, profilayah, (err, res) => {
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
ProfilAyah.findProfilAyahByNIS = (id_siswa, result) => {
    database.query(
        `SELECT nama_lengkap, NIK, tempat_lahir, tanggal_lahir, profil_agama.agama, status_hidup, status_kekerabatan, pendidikan_terakhir, penghasilan, alamat, phone, email
        FROM profil_ayah 
        LEFT JOIN profil_agama ON profil_ayah.agama = profil_agama.id
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
ProfilAyah.updateProfilAyahByNIS = (id_siswa, profil, result) => {
    database.query(
        `SELECT id FROM profil_ayah WHERE id_siswa = '${id_siswa}';`, (err, results) => {
            if (err) {
                result(err);
                return;
            }
            if (!results?.length) {
                result({ kind: "data_not_found" }, null);
                return;
            } else {
                database.query(
                    `UPDATE profil_ayah SET nama_lengkap = ?,NIK = ?, tempat_lahir = ?,tanggal_lahir = ?
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
ProfilAyah.deleteProfilAyahByNIS = (id_siswa, result) => {
    const withoutLineBreaks = id_siswa.replace(/[\r\n]/gm, '');
    database.query(
        `SELECT id FROM profil_ayah WHERE id_siswa = '${withoutLineBreaks}';`, (err, results) => {
            if (err) {
                result(err);
                return;
            }
            if (!results?.length) {
                result({ kind: "data_not_found" }, null);
                return;
            } else {
                database.query(
                    `DELETE FROM profil_ayah WHERE id_siswa = "${withoutLineBreaks}"`, (err, res) => {
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
module.exports = ProfilAyah;