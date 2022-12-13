const database = require("../../config/db");

const JenisKelaminModel = function (data) {
    this.id = data.id,
        this.jenis_kelamin = data.jenis_kelamin
}
// =================== read =======================
JenisKelaminModel.readAll = (result) => {
    database.query(
        `SELECT profil_jenis_kelamin.id,profil_jenis_kelamin.jenis_kelamin 
        FROM profil_jenis_kelamin`, (err, res) => {
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
JenisKelaminModel.readById = (id, result) => {
    database.query(
        `SELECT profil_jenis_kelamin.id, profil_jenis_kelamin.jenis_kelamin 
        FROM profil_jenis_kelamin WHERE profil_jenis_kelamin.id = '${id}';`, (err, res) => {
        if (err) {
            result(err);
            return;
        }
        if (!res?.length) {
            result(err);
            return
        } else {
            result(null, res);
        }
    }
    );
}
module.exports = JenisKelaminModel;