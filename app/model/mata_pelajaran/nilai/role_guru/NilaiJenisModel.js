const database = require("../../../../config/db");
const uuid = require("uuid");
const JenisNilai = function (data) {
    this.id = data.id,
        this.jenis_nilai = data.jenis_nilai
}
// ==================== read ======================
JenisNilai.getAll = (result) => {
    database.query(
        `SELECT report_nilai_jenis_nilai.id,report_nilai_jenis_nilai.jenis_nilai
        FROM report_nilai_jenis_nilai ;`,
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

// =================== create =====================
JenisNilai.TambahJenisNilai = (data, result) => {
    database.query(
        `INSERT INTO report_nilai_jenis_nilai SET ?`, data, (err, res) => {
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

// ==================== update ==============
JenisNilai.updateJenisNilai = (data, result) => {
    database.query(
        `UPDATE report_nilai_jenis_nilai SET jenis_nilai = ?
        WHERE report_nilai_jenis_nilai.id = '${data.id}';`,
        [data.jenis_nilai],
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
// ================== delete ================
JenisNilai.delete = (id, result) => {
    database.query(
        `DELETE FROM report_nilai_jenis_nilai
        WHERE report_nilai_jenis_nilai.id = '${data.id}';`,
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
module.exports = JenisNilai;