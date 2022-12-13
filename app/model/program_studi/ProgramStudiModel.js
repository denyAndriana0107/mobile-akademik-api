const database = require("../../config/db");
const ProgramStudiModel = function (data) {
    this.id = data.id,
        this.nama_program_studi = data.nama_program_studi,
        this.deskripsi = data.deskripsi
}

// ==================== create ====================
ProgramStudiModel.create = (data, result) => {
    database.query(
        `SELECT profil_program_studi.id FROM profil_program_studi
        WHERE LOWER(nama_program_studi) = LOWER('${data.nama_program_studi}')`,
        (err, res) => {
            if (err) {
                result(err);
                return;
            }
            if (res?.length) {
                result({ kind: "redundan_data" }, null);
                return;
            } else {
                database.query(
                    `INSERT INTO profil_program_studi SET ?`, data, (err, res2) => {
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
// ==================== read =====================
ProgramStudiModel.readAll = (result) => {
    database.query(
        `SELECT profil_program_studi.id, profil_program_studi.nama_program_studi, profil_program_studi.deskripsi 
        FROM profil_program_studi`, (err, res) => {
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

// ============== delete ===================
ProgramStudiModel.delete = (id, result) => {
    database.query(
        `SELECT profil_program_studi.id FROM profil_program_studi
        WHERE profil_program_studi.id = '${id}'`, (err, res) => {
        if (err) {
            result(err);
            return;
        }
        if (!res?.length) {
            result({ kind: "data_not_found" }, null);
            return;
        } else {
            database.query(
                `DELETE FROM profil_program_studi
                WHERE profil_program_studi.id = '${id}'`, (err, res) => {
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

module.exports = ProgramStudiModel;