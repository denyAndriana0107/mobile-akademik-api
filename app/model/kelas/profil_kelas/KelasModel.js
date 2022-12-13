const database = require("../../../config/db");

const KelasModel = function (kelas) {
    this.id = kelas.id,
        this.nama = kelas.nama,
        this.id_program_studi = kelas.id_program_studi,
        this.tingkat = kelas.tingkat,
        this.tahun_ajaran = kelas.tahun_ajaran,
        this.wali_kelas = kelas.wali_kelas
}
// ================ create ==========
KelasModel.create = (kelas, result) => {
    database.query(
        `SELECT kelas.id 
        FROM kelas 
        WHERE kelas.tahun_ajaran = '${kelas.tahun_ajaran}'
        AND kelas.tingkat= '${kelas.tingkat}'
        AND kelas.id_program_studi = '${kelas.id_program_studi}'
        AND LOWER(kelas.nama) LIKE '${kelas.nama}';`, (err, res) => {
        if (err) {
            result(err);
            return;
        }
        if (res?.length) {
            result({ kind: "redundan_data" }, null);
            return;
        } else {
            database.query(
                'INSERT INTO kelas SET ?', kelas, (err, res2) => {
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
// ================= read ============
KelasModel.readCount = (result) => {
    var date = new Date();
    var tahun_ajaran = date.getFullYear();
    var month = date.getMonth();
    if (month < 6) {
        tahun_ajaran = tahun_ajaran - 1;
    }
    database.query(
        `SELECT profil_program_studi.nama_program_studi,kelas.tingkat, COUNT(kelas.id) AS jumlah_kelas
        FROM kelas 
        LEFT JOIN profil_program_studi ON kelas.id_program_studi = profil_program_studi.id
        WHERE tahun_ajaran LIKE '${tahun_ajaran}%'
        GROUP BY kelas.id_program_studi,kelas.tingkat
        ORDER BY kelas.tingkat ASC;`, (err, res) => {
        if (err) {
            result(err);
            return;
        }
        if (!res?.length) {
            result({ kind: "data_not_found" }, null);
            return;
        }
        else {
            result(null, res);
            return;
        }
    }
    );
}
KelasModel.readCountTotal = (result) => {
    var date = new Date();
    var tahun_ajaran = date.getFullYear();
    var month = date.getMonth();
    if (month < 6) {
        tahun_ajaran = tahun_ajaran - 1;
    }
    database.query(
        `SELECT COUNT(kelas.id) AS jumlah_total_kelas FROM kelas
        WHERE tahun_ajaran LIKE '${tahun_ajaran}%';`, (err, res) => {
        if (err) {
            result(err);
            return
        } else {
            result(null, res);
            return;
        }
    }
    );
}
KelasModel.readDaftarKelasByTingkatTahunAjaranProgramStudi = (data, result) => {
    database.query(
        `SELECT kelas.id, kelas.nama, kelas.tingkat, profil_program_studi.nama_program_studi, kelas.tahun_ajaran,
        profil_guru.nama_lengkap AS wali_kelas
        FROM kelas
        LEFT JOIN profil_program_studi ON kelas.id_program_studi = profil_program_studi.id
        LEFT JOIN guru ON kelas.wali_kelas = guru.nip
        LEFT JOIN profil_guru ON profil_guru.id_guru = guru.nip
        WHERE kelas.tingkat = '${data.tingkat}'
        AND kelas.tahun_ajaran = '${data.tahun_ajaran}'
        AND kelas.id_program_studi = '${data.id_program_studi}';`, (err, res) => {
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
KelasModel.readDaftarKelasPerGuruPengampuPermatpel = (id_guru, id_matpel, result) => {
    database.query(
        `SELECT kelas.id , kelas.tingkat ,kelas.nama AS nama_kelas FROM mata_pelajaran_jadwal
        LEFT JOIN kelas ON mata_pelajaran_jadwal.id_kelas = kelas.id
        WHERE mata_pelajaran_jadwal.guru_pengampu = '${id_guru}'
        AND mata_pelajaran_jadwal.id_matpel = '${id_matpel}';`, (err, res) => {
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


// =============== update ===========
KelasModel.updateWaliKelas = (data, result) => {
    database.query(
        `SELECT kelas.id FROM kelas WHERE kelas.id = '${data.id}';`, (err, res) => {
            if (err) {
                result(err);
                return;
            }
            if (!res?.length) {
                result({ kind: "data_not_found" }, null);
                return;
            } else {
                database.query(
                    `UPDATE kelas SET wali_kelas = ? 
                    WHERE kelas.id = '${data.id}';`, [data.wali_kelas],
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
// =================== delete =============
KelasModel.delete = (id, result) => {
    database.query(
        `SELECT kelas.id FROM kelas WHERE kelas.id ='${id}';`, (err, res) => {
            if (err) {
                result(err);
                return;
            }
            if (!res?.length) {
                result({ kind: "data_not_found" }, null);
                return;
            } else {
                database.query(
                    `DELETE FROM kelas WHERE kelas.id = '${id}';`, (err, res) => {
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
module.exports = KelasModel;