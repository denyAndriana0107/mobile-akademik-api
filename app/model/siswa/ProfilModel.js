const database = require("../../config/db");
// konstruktor model untuk role siswa
const ProfilSiswa = function (Siswa) {
    this.id = Siswa.id,
        this.nama_lengkap = Siswa.nama_lengkap,
        this.periode_masuk = Siswa.periode_masuk,
        // this.status_akademik = Siswa.status_akademik,
        this.jenis_kelamin = Siswa.jenis_kelamin,
        this.tempat_lahir = Siswa.tempat_lahir,
        this.tanggal_lahir = Siswa.tanggal_lahir,
        this.agama = Siswa.agama,
        this.phone = Siswa.phone,
        this.email = Siswa.email,
        this.foto = Siswa.foto,
        this.id_siswa = Siswa.id_siswa,
        this.id_program_studi = Siswa.id_program_studi
}


// ========== Query =========
//create
ProfilSiswa.insert = (id_siswa, newSiswa, result,) => {
    const withoutLineBreaks = id_siswa.replace(/[\r\n]/gm, '');
    database.query(
        `SELECT id FROM profil_siswa WHERE id_siswa = '${withoutLineBreaks}';`,
        (err, res) => {
            if (res?.length) {
                result({ kind: "redundan_profil" }, null);
                return;
            }
            else {
                database.query(
                    `INSERT INTO profil_siswa SET id = ?, nama_lengkap = ?, periode_masuk = ?, jenis_kelamin = ?,tempat_lahir = ?,
                    tanggal_lahir = ?,agama = ?,phone = ? ,email = ?,id_siswa = ?, id_program_studi = ?`,
                    [newSiswa.id, newSiswa.nama_lengkap, newSiswa.periode_masuk, newSiswa.jenis_kelamin, newSiswa.tempat_lahir, newSiswa.tanggal_lahir, newSiswa.agama, newSiswa.phone, newSiswa.email, newSiswa.id_siswa, newSiswa.id_program_studi],
                    (err, res) => {
                        if (err) {
                            result(err);
                            return;
                        }

                        result(null);
                        return;
                    }
                );
            }
        }
    );
}

// read
ProfilSiswa.findProfilByNIS = (id_siswa, result) => {
    const withoutLineBreaks = id_siswa.replace(/[\r\n]/gm, '');
    database.query(
        `SELECT siswa.nis,profil_siswa.nama_lengkap,profil_program_studi.nama_program_studi,profil_jenis_kelamin.jenis_kelamin,profil_siswa.tempat_lahir,profil_siswa.tanggal_lahir,profil_agama.agama,profil_siswa.phone,profil_siswa.email,profil_siswa.foto 
        FROM profil_siswa 
        LEFT JOIN siswa ON profil_siswa.id_siswa = siswa.nis 
        LEFT JOIN profil_jenis_kelamin ON profil_siswa.jenis_kelamin = profil_jenis_kelamin.id 
        LEFT JOIN profil_agama ON profil_siswa.agama = profil_agama.id 
        LEFT JOIN profil_program_studi ON profil_siswa.id_program_studi = profil_program_studi.id
        WHERE profil_siswa.id_siswa = '${withoutLineBreaks}';`,
        (err, res) => {
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

// delete
ProfilSiswa.deleteProfilByNIS = (id_siswa, result) => {
    const withoutLineBreaks = id_siswa.replace(/[\r\n]/gm, '');
    database.query(
        `SELECT id FROM profil_siswa WHERE id_siswa = '${withoutLineBreaks}';`,
        (err, res) => {
            if (err) {
                result(err);
                return;
            }
            if (!res?.length) {
                result({ kind: "data_not_found" }, null);
                return;
            } else {
                database.query(
                    `DELETE FROM profil_siswa WHERE id_siswa = '${withoutLineBreaks}';`,
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

// update
ProfilSiswa.updateProfilByID = (id, profil, result) => {
    const withoutLineBreaks = id.replace(/[\r\n]/gm, '');
    database.query(
        `SELECT id FROM profil_siswa WHERE id_siswa = '${withoutLineBreaks}';`, (err, results) => {
            if (err) {
                result(err);
                return;
            }
            if (!results?.length) {
                result({ kind: "data_not_found" }, null);
                return;
            } else {
                database.query(
                    `UPDATE profil_siswa SET nama_lengkap = ?,jenis_kelamin = ?,tempat_lahir = ?,
                    tanggal_lahir = ?,agama = ?,phone = ? ,email = ?,id_program_studi = ?
                     WHERE id_siswa = '${withoutLineBreaks}';`,
                    [profil.nama_lengkap, profil.jenis_kelamin, profil.tempat_lahir, profil.tanggal_lahir, profil.agama, profil.phone, profil.email, profil.id_program_studi],
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
ProfilSiswa.uploadPhotoByNIS = (id, foto, result) => {
    database.query(
        `SELECT id FROM profil_siswa WHERE id_siswa ='${id}';`, (err, res) => {
            if (err) {
                result(err);
                return;
            }
            if (!res?.length) {
                result({ kind: "data_not_found" }, null);
                return;
            } else {
                database.query(
                    `UPDATE profil_siswa SET foto = ? WHERE id_siswa ='${id}';`,
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
module.exports = ProfilSiswa;