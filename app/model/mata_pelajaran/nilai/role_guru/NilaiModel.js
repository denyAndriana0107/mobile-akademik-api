const database = require("../../../../config/db");

const Nilai = function (nilai) {
    this.id = nilai.id,
        this.semester = nilai.semester,
        this.nilai = nilai.nilai,
        this.id_jenis_nilai = nilai.id_jenis_nilai,
        this.id_siswa = nilai.id_siswa,
        this.id_kelas = nilai.id_kelas,
        this.id_mata_pelajaran = nilai.id_mata_pelajaran,
        this.inputed = nilai.inputed,
        this.last_update = nilai.last_update
}

// ============ create ==================
Nilai.create = (nilai, result) => {
    database.query(
        `INSERT INTO report_nilai SET ?`, nilai, (err, res) => {
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

// ============= read ==================
Nilai.readByIdMataPelajaranIdKelas = (id_mata_pelajaran, id_kelas, id_siswa, result) => {
    database.query(
        `SELECT report_nilai.id, mata_pelajaran.nama_pelajaran, report_nilai.id, report_nilai.nilai,report_nilai_jenis_nilai.jenis_nilai,
        report_nilai.semester, kelas.nama as nama_kelas, kelas.tingkat, report_nilai.id_siswa, profil_siswa.nama_lengkap as nama_siswa FROM report_nilai
        LEFT JOIN mata_pelajaran ON report_nilai.id_mata_pelajaran = mata_pelajaran.id
        LEFT JOIN report_nilai_jenis_nilai ON report_nilai.id_jenis_nilai = report_nilai_jenis_nilai.id
        LEFT JOIN kelas ON report_nilai.id_kelas = kelas.id
        LEFT JOIN siswa ON report_nilai.id_siswa = siswa.nis
        LEFT JOIN profil_siswa ON profil_siswa.id_siswa = siswa.nis
        WHERE report_nilai.id_mata_pelajaran = '${id_mata_pelajaran}' 
        AND report_nilai.id_kelas = '${id_kelas}'
        AND report_nilai.id_siswa = '${id_siswa}'
        ORDER by report_nilai.id_jenis_nilai;`,
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
// ============= update =================
Nilai.updateNilaiSiswaById = (data, result) => {
    database.query(
        `SELECT id FROM report_nilai WHERE report_nilai.id = '${data.id_nilai}';`,
        (err, res) => {
            if (condition) {
                result(err);
                return;
            }
            if (!res?.length) {
                result({ kind: "data_not_found" }, null);
                return;
            } else {
                database.query(
                    `UPDATE report_nilai SET nilai = ?,last_update = ? WHERE report_nilai.id = '${data.id_nilai}';`,
                    [data.nilai, data.last_update],
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
module.exports = Nilai;