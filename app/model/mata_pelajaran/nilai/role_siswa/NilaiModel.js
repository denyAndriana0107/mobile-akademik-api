const database = require('../../../../config/db');
const NilaiModel = function (data) {
    this.id_siswa = data.id_siswa,
        this.tingkat = data.tingkat,
        this.semester = data.semester

}
// ====================== nilai per semester =====================
NilaiModel.readNilaiByTingkatBySemester = (data, result) => {
    database.query(
        `SELECT mata_pelajaran.nama_pelajaran,report_nilai.nilai, report_nilai_jenis_nilai.jenis_nilai FROM report_nilai
    LEFT JOIN report_nilai_jenis_nilai ON report_nilai.id_jenis_nilai = report_nilai_jenis_nilai.id
    LEFT JOIN mata_pelajaran ON report_nilai.id_mata_pelajaran = mata_pelajaran.id
    WHERE report_nilai.id_siswa = '${data.id_siswa}'
    AND report_nilai.semester = ${data.semester}
    ORDER BY mata_pelajaran.nama_pelajaran,report_nilai.id_jenis_nilai`, (err, res) => {
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
NilaiModel.getMataPelajaranByTingkat = (data, result) => {
    database.query(
        `SELECT DISTINCT(mata_pelajaran.nama_pelajaran) AS nama_pelajaran
        FROM mata_pelajaran_jadwal 
        LEFT JOIN kelas ON mata_pelajaran_jadwal.id_kelas = kelas.id 
        LEFT JOIN mata_pelajaran ON mata_pelajaran_jadwal.id_matpel = mata_pelajaran.id 
        LEFT JOIN kelas_daftar_siswa_perkelas ON kelas_daftar_siswa_perkelas.id_kelas = kelas.id 
        WHERE kelas_daftar_siswa_perkelas.id_siswa = '${data.id_siswa}' 
        AND mata_pelajaran.tingkat = '${data.tingkat}'`, (err, res) => {
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
NilaiModel.getNilaiFinalMataPelajaranBySemester = (data, result) => {
    database.query(
        `SELECT report_nilai_final.final_nilai, report_nilai_final.grade, mata_pelajaran.nama_pelajaran
        FROM report_nilai_final
        LEFT JOIN mata_pelajaran ON report_nilai_final.id_mata_pelajaran = mata_pelajaran.id 
        WHERE report_nilai_final.id_siswa = '${data.id_siswa}' 
        AND report_nilai_final.semester = '${data.semester}'
        ORDER BY mata_pelajaran.nama_pelajaran`, (err, res) => {
        if (err) {
            result(err);
            return;
        }
        if (!res?.length) {
            result({ kind: "data_not_found" });
            return;
        } else {
            result(null, res);
        }
    }
    );
}

// ======================== transkrip all nilai ===============
NilaiModel.getMataPelajaranAllPerSiswa = (data, result) => {
    database.query(
        `SELECT DISTINCT(mata_pelajaran.nama_pelajaran) AS nama_pelajaran, mata_pelajaran.tingkat
         FROM mata_pelajaran_jadwal 
         LEFT JOIN kelas ON mata_pelajaran_jadwal.id_kelas = kelas.id 
         LEFT JOIN mata_pelajaran ON mata_pelajaran_jadwal.id_matpel = mata_pelajaran.id 
         LEFT JOIN kelas_daftar_siswa_perkelas ON kelas_daftar_siswa_perkelas.id_kelas = kelas.id 
         WHERE kelas_daftar_siswa_perkelas.id_siswa = '${data.id_siswa}'
         ORDER BY mata_pelajaran.tingkat, mata_pelajaran.nama_pelajaran;`,
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

NilaiModel.getTranskripNilaiPerSiswa = (data, result) => {
    database.query(
        `SELECT report_nilai_final.final_nilai, report_nilai_final.grade,
        mata_pelajaran.nama_pelajaran, report_nilai_final.semester
        FROM report_nilai_final
        LEFT JOIN mata_pelajaran ON report_nilai_final.id_mata_pelajaran = mata_pelajaran.id 
        WHERE report_nilai_final.id_siswa = '${data.id_siswa}'
        ORDER BY report_nilai_final.semester, mata_pelajaran.nama_pelajaran`,
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
module.exports = NilaiModel;