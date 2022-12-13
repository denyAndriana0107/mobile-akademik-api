const database = require("../../../config/db");

const MataPelajaran = function (mataPelajaran) {
    this.id = mataPelajaran.id,
        this.nama_pelajaran = mataPelajaran.nama_pelajaran,
        this.tingkat = mataPelajaran.tingkat,
        this.sks = mataPelajaran.sks,
        this.kategori = mataPelajaran.kategori

}
// ========== query ===============

// create
MataPelajaran.create = (newMatPel, result) => {
    database.query(
        `SELECT id FROM mata_pelajaran WHERE LOWER(nama_pelajaran) = LOWER('${newMatPel.nama_pelajaran}') 
        AND LOWER(tingkat) = LOWER(${newMatPel.tingkat})`,
        (err, results) => {
            if (err) {
                result(err);
                return;
            }
            if (results?.length) {
                result({ kind: "data_redundan" }, null);
                return;
            } else {
                database.query(
                    `INSERT INTO mata_pelajaran SET ?`, newMatPel, (err, results2) => {
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
// read
MataPelajaran.readAll = (result) => {
    database.query(
        `SELECT * FROM mata_pelajaran ORDER BY tingkat`, (err, results) => {
            if (err) {
                result(err);
                return;
            } else {
                result(null, results);
                return;
            }
        }
    );
}
MataPelajaran.findById = (id_mata_pelajaran, result) => {
    const withoutLineBreaks = id_mata_pelajaran.replace(/[\r\n]/gm, '');
    database.query(
        `SELECT mata_pelajaran.id, mata_pelajaran.nama_pelajaran,
        mata_pelajaran.tingkat,mata_pelajaran.sks,mata_pelajaran.kategori 
        FROM mata_pelajaran WHERE id = '${withoutLineBreaks}';`,
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
// delete
MataPelajaran.deleteById = (id_mata_pelajaran, result) => {
    const withoutLineBreaks = id_mata_pelajaran.replace(/[\r\n]/gm, '');
    database.query(
        `SELECT id FROM mata_pelajaran WHERE id = '${withoutLineBreaks}';`,
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
                    `DELETE FROM mata_pelajaran WHERE id = '${withoutLineBreaks}';`,
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
// update
MataPelajaran.updateById = (id_mata_pelajaran, mataPelajaran, result) => {
    const withoutLineBreaks = id_mata_pelajaran.replace(/[\r\n]/gm, '');
    database.query(
        `SELECT id FROM mata_pelajaran WHERE id = '${withoutLineBreaks}';`,
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
                    `SELECT id FROM mata_pelajaran WHERE LOWER(nama_pelajaran) = LOWER('${mataPelajaran.nama_pelajaran}') 
                    AND LOWER(tingkat) = LOWER(${mataPelajaran.tingkat})`,
                    (err, res) => {
                        if (err) {
                            result(err);
                            return;
                        }
                        if (res?.length) {
                            result({ kind: "data_redundan" }, null);
                            return;
                        } else {
                            database.query(
                                `UPDATE mata_pelajaran SET nama_pelajaran = ?,tingkat = ?,sks = ?,kategori = ?
                                WHERE id = '${withoutLineBreaks}';`,
                                [mataPelajaran.nama_pelajaran, mataPelajaran.tingkat, mataPelajaran.sks, mataPelajaran.kategori],
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
        }
    );
}
module.exports = MataPelajaran;