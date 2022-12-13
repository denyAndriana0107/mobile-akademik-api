const database = require("../../../config/db");
const Pengampu = function (guru) {
    this.id_matpel = guru.id_matpel,
        this.id_guru = guru.id_guru
}

// ================ query =================
Pengampu.insert = (pengampu, result) => {
    database.query(
        `SELECT id_guru FROM mata_pelajaran_guru_pengampu WHERE id_matpel = '${pengampu.id_matpel}' AND id_guru = '${pengampu.id_guru}';`,
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
                    `INSERT INTO mata_pelajaran_guru_pengampu SET ?`, pengampu,
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
// ================ read ==================
Pengampu.getAll = (result) => {
    database.query(
        `SELECT mata_pelajaran_guru_pengampu.id_matpel, mata_pelajaran.nama_pelajaran, 
        mata_pelajaran.tingkat, profil_guru.nama_lengkap , mata_pelajaran_guru_pengampu.id_guru
        FROM mata_pelajaran_guru_pengampu 
        LEFT JOIN mata_pelajaran ON mata_pelajaran_guru_pengampu.id_matpel = mata_pelajaran.id 
        LEFT JOIN profil_guru ON mata_pelajaran_guru_pengampu.id_guru = profil_guru.id_guru
        ORDER BY mata_pelajaran.tingkat;`,
        (err, res) => {
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
Pengampu.getMataPelajaranByGuruPengampu = (id_guru, result) => {
    database.query(
        `SELECT mata_pelajaran.id,mata_pelajaran.nama_pelajaran,mata_pelajaran.tingkat,mata_pelajaran.sks 
        FROM mata_pelajaran LEFT JOIN mata_pelajaran_guru_pengampu ON mata_pelajaran_guru_pengampu.id_matpel = mata_pelajaran.id 
        WHERE mata_pelajaran_guru_pengampu.id_guru = '${id_guru}';`,
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
                return
            }
        }
    );
}

module.exports = Pengampu;