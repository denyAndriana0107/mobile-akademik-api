const database = require("../../../../config/db");
require("dotenv").config();
const NilaiFinal = function (nilai) {
    this.id = nilai.id,
        this.final_nilai = nilai.final_nilai,
        this.grade = nilai.grade,
        this.semester = nilai.semester,
        this.id_siswa = nilai.id_siswa,
        this.id_kelas = nilai.id_kelas,
        this.id_mata_pelajaran = nilai.id_mata_pelajaran
}
// ================== create =========================
NilaiFinal.insertFinalNilai = (id_siswa, id_mata_pelajaran, semester, nilai, result) => {
    database.query(
        `SELECT report_nilai_final.id FROM report_nilai_final 
        WHERE report_nilai_final.id_siswa = '${id_siswa}'
        AND report_nilai_final.semester = ${semester}
        AND report_nilai_final.id_mata_pelajaran = '${id_mata_pelajaran}'`, (err, res) => {
        if (err) {
            result(err);
            return;
        }
        if (!res?.length) {
            database.query(
                `INSERT INTO report_nilai_final SET ?`, nilai, (err, res) => {
                    if (err) {
                        result(err);
                        return;
                    } else {
                        result(null);
                        return;
                    }
                }
            );
        } else {
            database.query(
                `UPDATE report_nilai_final SET final_nilai = ?,grade = ?
                WHERE report_nilai_final.id_siswa = '${id_siswa}'
                AND report_nilai_final.semester = ${semester}
                AND report_nilai_final.id_mata_pelajaran = '${id_mata_pelajaran}'`,
                [nilai.final_nilai, nilai.grade],
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

NilaiFinal.sumFinalNilai = (id_siswa, id_mata_pelajaran, semester, result) => {
    database.query(
        `SELECT
        (SELECT AVG(report_nilai.nilai)FROM report_nilai WHERE report_nilai.id_jenis_nilai = 'd300cd35-35'
        AND report_nilai.semester = ${semester} AND report_nilai.id_mata_pelajaran = '${id_mata_pelajaran}'
        AND report_nilai.id_siswa = '${id_siswa}') AS Tugas,
        (SELECT AVG(report_nilai.nilai)FROM report_nilai WHERE report_nilai.id_jenis_nilai = 'a5c96545-83'
        AND report_nilai.semester = ${semester} AND report_nilai.id_mata_pelajaran = '${id_mata_pelajaran}'
        AND report_nilai.id_siswa = '${id_siswa}') AS Quiz,
        (SELECT AVG(report_nilai.nilai)FROM report_nilai WHERE report_nilai.id_jenis_nilai = '147cbf64-fd'
        AND report_nilai.semester = ${semester} AND report_nilai.id_mata_pelajaran = '${id_mata_pelajaran}'
        AND report_nilai.id_siswa = '${id_siswa}') AS UTS,
        (SELECT AVG(report_nilai.nilai)FROM report_nilai WHERE report_nilai.id_jenis_nilai = 'e47754f2-89'
        AND report_nilai.semester = ${semester} AND report_nilai.id_mata_pelajaran = '${id_mata_pelajaran}'
        AND report_nilai.id_siswa = '${id_siswa}') AS UAS;`,
        (err, res) => {
            if (err) {
                result(err);
                return;
            } else {
                result(null, res);
            }
        }
    );

}

// ============= read ===========================
NilaiFinal.readAllByIdMataPelajaranByIdKelas = (id_mata_pelajaran, id_kelas, result) => {
    database.query(
        `SELECT report_nilai_final.final_nilai, report_nilai_final.grade, mata_pelajaran.nama_pelajaran, report_nilai_final.id_siswa, 
        profil_siswa.nama_lengkap as nama_siswa, kelas.nama as nama_kelas, kelas.tingkat FROM report_nilai_final 
        LEFT JOIN mata_pelajaran ON report_nilai_final.id_mata_pelajaran = mata_pelajaran.id
        LEFT JOIN kelas ON report_nilai_final.id_kelas = kelas.id
        LEFT JOIN siswa ON report_nilai_final.id_siswa = siswa.nis
        LEFT JOIN profil_siswa ON profil_siswa.id_siswa = siswa.nis
        WHERE report_nilai_final.id_mata_pelajaran = '${id_mata_pelajaran}'
        AND report_nilai_final.id_kelas = '${id_kelas}'
        ORDER BY report_nilai_final.semester ASC,report_nilai_final.id_siswa DESC;`,
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

module.exports = NilaiFinal;