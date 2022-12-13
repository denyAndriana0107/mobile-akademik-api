const database = require("../../../config/db");
const ProfilSekolahModel = function (profil) {
    this.nama_sekolah = profil.nama_sekolah,
        this.tentang_sekolah = profil.tentang_sekolah,
        this.akreditasi = profil.akreditasi,
        this.alamat = profil.alamat,
        this.phone = profil.phone,
        this.email = profil.email,
        this.foto = profil.foto
}

// ======================== update ===================
ProfilSekolahModel.update = (data, result) => {
    database.query(
        `UPDATE sekolah_profil SET nama_sekolah = ?,tentang_sekolah = ?,akreditasi = ?,
        alamat = ?,phone = ?,email = ?, foto = ?
        WHERE sekolah_profil.id = '00874afa7-3';`,
        [data.nama_sekolah, data.tentang_sekolah, data.akreditasi, data.alamat, data.phone, data.email, data.foto],
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

// ======================= read =====================
ProfilSekolahModel.read = (result) => {
    database.query(
        `SELECT sekolah_profil.nama_sekolah,sekolah_profil.tentang_sekolah,sekolah_profil.akreditasi, 
        sekolah_profil.alamat, sekolah_profil.phone, sekolah_profil.email, sekolah_profil.foto 
        FROM sekolah_profil`, (err, res) => {
        if (err) {
            result(err);
        } else {
            result(null, res);
            return;
        }
    }
    );
}

module.exports = ProfilSekolahModel;