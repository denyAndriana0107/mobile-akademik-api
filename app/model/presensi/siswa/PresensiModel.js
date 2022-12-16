const database = require("../../../config/db");
var uuid = require("uuid");
var getTimeStamp = require("../../../helper/GetTimeStamps")

const PresensiModel = function (presensi) {
    this.id = presensi.id,
        this.tanggal_presensi = presensi.tanggal_presensi,
        this.waktu_presensi = presensi.waktu_presensi,
        this.device_info = presensi.device_info,
        this.ip_address_info = presensi.ip_address_info,
        this.lokasi_info = presensi.lokasi_info,
        this.status_hadir = presensi.status_hadir,
        this.status_terlambat = presensi.status_terlambat,
        this.id_siswa = presensi.id_siswa,
        this.id_kelas = presensi.id_kelas,
        this.foto = presensi.foto,
        this.keterangan_tidak_hadir = presensi.keterangan_tidak_hadir

}
// ================= query =========================

// init presensi
PresensiModel.create = (result) => {
    var data_date = getTimeStamp.date();
    var array_date = data_date.split("-");
    var tahun_ajaran = "";
    if (array_date[1] > 5) {
        tahun_ajaran = `${array_date[0]}/${array_date[0] + 1}`;
    } else {
        tahun_ajaran = `${array_date[0] - 1}/${array_date[0]}`;
    }
    database.query(
        `SELECT id_siswa,id_kelas FROM kelas_daftar_siswa_perkelas 
        LEFT JOIN siswa ON kelas_daftar_siswa_perkelas.id_siswa = siswa.nis
        LEFT JOIN kelas ON kelas_daftar_siswa_perkelas.id_kelas = kelas.id
        WHERE siswa.status_akademik = 1
        AND kelas.tahun_ajaran = '${tahun_ajaran}'
        ORDER BY kelas_daftar_siswa_perkelas.id_siswa`,
        (err, res) => {
            if (err) {
                result(err);
                return;
            } else {
                for (let i = 0; i < res.length; i++) {
                    database.query(
                        `INSERT INTO siswa_presensi SET id = ?,tanggal_presensi = ?,id_siswa = ?,id_kelas = ?`,
                        [uuid.v4().substring(0, 10), getTimeStamp.date(), res[i]['id_siswa'], res[i]['id_kelas']],
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
        }
    );
}

// =================== update ====================== 
PresensiModel.presensi = (id_siswa, presensi, result) => {
    database.query(
        `SELECT id FROM siswa_presensi WHERE id_siswa = '${id_siswa}' AND tanggal_presensi = '${getTimeStamp.date()}';`,
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
                    `UPDATE siswa_presensi SET waktu_presensi = ?, device_info =?,	ip_address_info	= ?,
                    lokasi_info=?, status_hadir = ?, status_terlambat = ?,foto = ?,keterangan_tidak_hadir = ?
                    WHERE tanggal_presensi = '${getTimeStamp.date()}' AND id_siswa = '${id_siswa}'`,
                    [presensi.waktu_presensi, presensi.device_info, presensi.ip_address_info,
                    presensi.lokasi_info, presensi.status_hadir, presensi.status_terlambat, presensi.foto, presensi.keterangan_tidak_hadir],
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

// ================== read =======================
PresensiModel.getStatusNow = (data, result) => {
    database.query(
        `SELECT siswa_presensi.status_hadir ,siswa_presensi.status_terlambat
        FROM siswa_presensi 
        WHERE siswa_presensi.tanggal_presensi = '${data.tanggal_presensi}'
        AND siswa_presensi.id_siswa = '${data.id_siswa}';`, (err, res) => {
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
PresensiModel.calculatePresensiCurrent = (data, result) => {
    var sum_total = 0;
    var total_hadir = 0;
    var total_tidak_hadir = 0;
    database.query(
        `SELECT MAX(kelas.tingkat) AS tingkat FROM kelas_daftar_siswa_perkelas 
        LEFT JOIN kelas ON kelas_daftar_siswa_perkelas.id_kelas = kelas.id 
        WHERE kelas_daftar_siswa_perkelas.id_siswa = '${data.id_siswa}';`,
        (err, res) => {
            if (err) {
                result(err);
                return;
            }
            if (!res?.length) {
                console.log("ini null max");
                result({ kind: "data_not_found" }, null);
                return;
            } else {
                database.query(
                    `SELECT
                    (
                        SELECT COUNT(siswa_presensi.id)
                        FROM siswa_presensi
                        LEFT JOIN kelas ON siswa_presensi.id_kelas = kelas.id
                        WHERE siswa_presensi.id_siswa = '${data.id_siswa}' 
                        AND kelas.tingkat = '${res[0]['tingkat']}' 
                        AND siswa_presensi.status_hadir = 1
                        GROUP BY siswa_presensi.id_kelas
                    ) AS total_hadir,
                    (
                        SELECT COUNT(siswa_presensi.id)
                        FROM siswa_presensi 
                        LEFT JOIN kelas ON siswa_presensi.id_kelas = kelas.id
                        WHERE siswa_presensi.id_siswa = '${data.id_siswa}' 
                        AND kelas.tingkat = '${res[0]['tingkat']}' 
                        GROUP BY siswa_presensi.id_kelas
                    ) AS total_presensi`,
                    (err, res2) => {
                        if (err) {
                            result(err);
                            return;
                        }
                        if (res2[0]['total_presensi'] == null) {
                            result({ kind: "data_not_found" }, null);
                            return;
                        } else {
                            sum_total = res2[0]['total_presensi'];
                            total_hadir = res2[0]['total_hadir'];
                            total_tidak_hadir = sum_total - total_hadir;
                            var presentase_kehadiran = (total_hadir / sum_total) * 100;
                            var data = {
                                presentase_kehadiran: presentase_kehadiran,
                                total_tidak_hadir: total_tidak_hadir
                            }
                            result(null, data);
                            return;
                        }
                    }
                );
            }
        }
    );
}
PresensiModel.logsPresensi = (id_siswa, result) => {
    database.query(
        `SELECT siswa_presensi.id_siswa ,siswa_presensi.tanggal_presensi, 
        siswa_presensi.status_hadir, siswa_presensi.status_terlambat  
        FROM siswa_presensi 
        WHERE siswa_presensi.id_siswa = '${id_siswa}'
        ORDER BY siswa_presensi.tanggal_presensi DESC LIMIT 25`,
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
module.exports = PresensiModel;