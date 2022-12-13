const database = require("../../../config/db");
const data_siswa_kelas = function (data) {
    this.id_siswa = data.id_siswa,
        this.id_kelas = data.id_kelas
}

// ================== create ===================
data_siswa_kelas.insert_siswa_to_kelas = (data, result) => {

    // cek apakah siswa sudah dapat kelas
    database.query(
        `SELECT kelas_daftar_siswa_perkelas.id_siswa 
        FROM kelas_daftar_siswa_perkelas 
        WHERE kelas_daftar_siswa_perkelas.id_siswa = '${data.id_siswa}'
        AND kelas_daftar_siswa_perkelas.id_kelas = '${data.id_kelas}';`, (err, res) => {
        if (err) {
            result(err);
            return;
        }
        if (res?.length) {
            result({ kind: "redundan_data" }, null);
            return;
        } else {
            database.query(
                `INSERT INTO kelas_daftar_siswa_perkelas SET ?`, data, (err, res) => {
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

// ================ read ========================
data_siswa_kelas.read_data_kelas_persiswa = (id_siswa, result) => {
    let tingkat;
    // ambil tingkat kelas sekarang
    database.query(
        `SELECT MAX(kelas.tingkat) FROM kelas_daftar_siswa_perkelas 
        LEFT JOIN kelas ON kelas_daftar_siswa_perkelas.id_kelas = kelas.id 
        WHERE kelas_daftar_siswa_perkelas.id_siswa = '${id_siswa}';`, (err, res) => {
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
                `SELECT kelas.tingkat, kelas.nama as nama_kelas, profil_guru.nama_lengkap as wali_kelas 
                    FROM kelas 
                    LEFT JOIN kelas_daftar_siswa_perkelas ON kelas_daftar_siswa_perkelas.id_kelas = kelas.id 
                    LEFT JOIN guru ON kelas.wali_kelas = guru.nip 
                    LEFT JOIN profil_guru ON profil_guru.id_guru = guru.nip 
                    WHERE kelas_daftar_siswa_perkelas.id_siswa = '${id_siswa}'
                    AND kelas.tingkat = ${tingkat}`, (err, res2) => {
                if (err) {
                    result(err);
                    return;
                } else {
                    result(null, res2);
                    return;
                }
            }
            );
        }
    }
    );
}
data_siswa_kelas.daftar_siswa_perkelas = (id, result) => {
    database.query(
        `SELECT kelas_daftar_siswa_perkelas.id_siswa, profil_siswa.nama_lengkap 
        FROM kelas_daftar_siswa_perkelas 
        LEFT JOIN siswa ON kelas_daftar_siswa_perkelas.id_siswa = siswa.nis
        LEFT JOIN profil_siswa ON profil_siswa.id_siswa = siswa.nis
        WHERE kelas_daftar_siswa_perkelas.id_kelas = '${id}'
        ORDER BY kelas_daftar_siswa_perkelas.id_siswa;`, (err, res) => {
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

// =============== update =====================


// ============= delete ======================
data_siswa_kelas.delete = () => {

}

module.exports = data_siswa_kelas;