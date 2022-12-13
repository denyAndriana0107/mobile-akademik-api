const database = require("../../../config/db");
var timestamp = require("../../../helper/GetTimeStamps");
const Jadwal = function (mata_pelajaran_jadwal) {
    this.id = mata_pelajaran_jadwal.id,
        this.date = mata_pelajaran_jadwal.date,
        this.time = mata_pelajaran_jadwal.time,
        this.id_matpel = mata_pelajaran_jadwal.id_matpel,
        this.id_kelas = mata_pelajaran_jadwal.id_kelas,
        this.guru_pengampu = mata_pelajaran_jadwal.guru_pengampu
}
Jadwal.readAllJadwalPerNIS = (id_siswa, result) => {
    let tingkat;
    database.query(
        `SELECT MAX(kelas.tingkat) FROM kelas_daftar_siswa_perkelas 
        LEFT JOIN kelas ON kelas_daftar_siswa_perkelas.id_kelas = kelas.id 
        WHERE kelas_daftar_siswa_perkelas.id_siswa = '${id_siswa}';`,
        (err, res) => {
            if (err) {
                result(err);
                return;
            }
            if (!res?.length) {
                result({ kind: "data_not_found" }, null);
                return;
            } else {
                tingkat = res[0]['MAX(kelas.tingkat)'];
                database.query(
                    `SELECT mata_pelajaran_jadwal.date, mata_pelajaran.nama_pelajaran, mata_pelajaran.sks ,mata_pelajaran_jadwal.time,kelas.tingkat, kelas.nama, profil_guru.nama_lengkap AS guru_pengampu
                    FROM mata_pelajaran_jadwal
                    LEFT JOIN mata_pelajaran ON mata_pelajaran_jadwal.id_matpel = mata_pelajaran.id
                    LEFT JOIN kelas_daftar_siswa_perkelas ON mata_pelajaran_jadwal.id_kelas = kelas_daftar_siswa_perkelas.id_kelas 
                    LEFT JOIN kelas ON kelas_daftar_siswa_perkelas.id_kelas = kelas.id
                    LEFT JOIN mata_pelajaran_guru_pengampu ON mata_pelajaran_jadwal.guru_pengampu = mata_pelajaran_guru_pengampu.id_guru
                    LEFT JOIN guru ON mata_pelajaran_guru_pengampu.id_guru = guru.nip
                    LEFT JOIN profil_guru ON guru.nip = profil_guru.id_guru
                    WHERE kelas_daftar_siswa_perkelas.id_siswa = '${id_siswa}'
                    AND kelas.tingkat = '${tingkat}'  
                    ORDER BY mata_pelajaran_jadwal.date ASC`, (err, results) => {
                    if (err) {
                        result(err);
                        return;
                    }
                    if (!results?.length) {
                        result({ kind: "data_not_found" }, null);
                        return;
                    }
                    else {
                        result(null, results);
                        return;
                    }
                }
                );
            }
        }
    );
}
Jadwal.readJadwallOnThisDay = (id_siswa, result) => {
    let day = timestamp.day();
    let tingkat;
    database.query(
        `SELECT MAX(kelas.tingkat) FROM kelas_daftar_siswa_perkelas 
        LEFT JOIN kelas ON kelas_daftar_siswa_perkelas.id_kelas = kelas.id 
        WHERE kelas_daftar_siswa_perkelas.id_siswa = '${id_siswa}';`,
        (err, res) => {
            if (err) {
                result(err);
                return;
            }
            if (!res?.length) {
                result({ kind: "data_not_found" }, null);
                return;
            } else {
                tingkat = res[0]['MAX(kelas.tingkat)'];
                database.query(
                    `SELECT mata_pelajaran_jadwal.date, mata_pelajaran.nama_pelajaran, mata_pelajaran.sks ,mata_pelajaran_jadwal.time,kelas.tingkat, kelas.nama, profil_guru.nama_lengkap AS guru_pengampu
                    FROM mata_pelajaran_jadwal 
                    LEFT JOIN mata_pelajaran ON mata_pelajaran_jadwal.id_matpel = mata_pelajaran.id
                    LEFT JOIN kelas_daftar_siswa_perkelas ON mata_pelajaran_jadwal.id_kelas = kelas_daftar_siswa_perkelas.id_kelas 
                    LEFT JOIN kelas ON kelas_daftar_siswa_perkelas.id_kelas = kelas.id
                    LEFT JOIN mata_pelajaran_guru_pengampu ON mata_pelajaran_jadwal.guru_pengampu = mata_pelajaran_guru_pengampu.id_guru
                    LEFT JOIN guru ON mata_pelajaran_guru_pengampu.id_guru = guru.nip
                    LEFT JOIN profil_guru ON guru.nip = profil_guru.id_guru
                    WHERE kelas_daftar_siswa_perkelas.id_siswa = '${id_siswa}' 
                    AND mata_pelajaran.tingkat = ${tingkat}
                    AND mata_pelajaran_jadwal.date = ${day}
                    ORDER BY mata_pelajaran_jadwal.time`, (err, results) => {
                    if (err) {
                        result(err);
                        return;
                    }
                    if (!results?.length) {
                        result({ kind: "data_not_found" }, null);
                        return;
                    }
                    else {
                        result(null, results);
                        return;
                    }
                }
                );
            }
        }
    );

}

module.exports = Jadwal;