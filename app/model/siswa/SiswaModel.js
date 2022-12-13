const database = require("../../config/db");

const SiswaModel = function (siswa) {
    this.id = siswa.id,
        this.nis = siswa.username,
        this.status_akademik = siswa.status_akademik
}

// insert siswa primary references
SiswaModel.create = (newSiswa, result) => {
    database.query(
        `INSERT INTO siswa SET ?`, newSiswa, (err, results) => {
            if (err) {
                result(err);
                return;
            } else {
                result(null);
                return;
            }
        }
    );
};

module.exports = SiswaModel;