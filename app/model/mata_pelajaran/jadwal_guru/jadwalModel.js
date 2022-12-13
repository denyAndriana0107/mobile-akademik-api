const database = require("../../../config/db");
const JadwalModel = function (mata_pelajaran_jadwal) {
    this.id = mata_pelajaran_jadwal.id,
        this.date = mata_pelajaran_jadwal.date,
        this.time = mata_pelajaran_jadwal.time,
        this.id_matpel = mata_pelajaran_jadwal.id_matpel,
        this.id_kelas = mata_pelajaran_jadwal.id_kelas,
        this.guru_pengampu = mata_pelajaran_jadwal.guru_pengampu
}
JadwalModel.readAll = (id_guru, result) => {
    database.query(
        `SELECT mata_pelajaran_jadwal.date,mata_pelajaran_jadwal.time,mata_pelajaran.nama_pelajaran,kelas.nama AS 'nama_kelas',kelas.tingkat 
        ,mata_pelajaran.sks
        FROM mata_pelajaran_jadwal 
        LEFT JOIN mata_pelajaran ON mata_pelajaran_jadwal.id_matpel = mata_pelajaran.id 
        LEFT JOIN kelas ON mata_pelajaran_jadwal.id_kelas = kelas.id
        WHERE mata_pelajaran_jadwal.guru_pengampu = '${id_guru}' ORDER BY mata_pelajaran_jadwal.date;`,
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
};
JadwalModel.ReadThisDay = (id_guru, result) => {
    const d = new Date();
    let day = d.getDay();
    database.query(
        `SELECT mata_pelajaran_jadwal.date,mata_pelajaran_jadwal.time,mata_pelajaran.nama_pelajaran,kelas.nama AS 'nama_kelas',kelas.tingkat 
        ,mata_pelajaran.sks FROM mata_pelajaran_jadwal 
        LEFT JOIN mata_pelajaran ON mata_pelajaran_jadwal.id_matpel = mata_pelajaran.id 
        LEFT JOIN kelas ON mata_pelajaran_jadwal.id_kelas = kelas.id
        WHERE mata_pelajaran_jadwal.guru_pengampu = '${id_guru}' 
        AND mata_pelajaran_jadwal.date = '${day}'
        ORDER BY mata_pelajaran_jadwal.date;`,
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
module.exports = JadwalModel;