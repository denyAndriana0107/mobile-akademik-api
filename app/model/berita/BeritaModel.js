const database = require("../../config/db");

const Berita = function (berita) {
    this.id = berita.id,
        this.judul = berita.judul,
        this.gambar = berita.gambar,
        this.deskripsi = berita.deskripsi,
        this.waktu_input = berita.waktu_input
}
// =========== query ============= 
// Read
Berita.getNewsFirstPagination = (results) => {
    database.query(
        `SELECT * FROM berita ORDER BY waktu_input LIMIT 25`,
        (err, result) => {
            if (err) {
                results(err);
                return;
            }
            if (!result?.length) {
                results({ kind: "data_not_found" }, null);
                return;
            }
            results(null, result);
            return;
        }
    );
}
Berita.getNewsPagination = (pagination, result) => {
    var offset = (pagination - 1) * 25;
    database.query(
        `SELECT * FROM berita ORDER BY waktu_input LIMIT 25 OFFSET ${offset}`,
        (err, results) => {
            if (err) {
                result(err);
                return;
            }
            if (!result?.length) {
                result({ kind: "data_not_found" }, null);
                return;
            }
            result(null, results);
            return;
        }
    );
}

Berita.findById = (id, result) => {
    database.query(
        `SELECT * FROM berita WHERE id = '${id}'`,
        (err, results) => {

            if (err) {
                result(err, null);
                return;
            }
            if (results?.length) {
                result(null, results[0]);
                return;
            }
            result({ kind: "not_found" }, null);
            return;
        }
    );
}

//create
Berita.create = (newData, result) => {
    database.query(
        `SELECT id FROM berita WHERE LOWER(judul) = LOWER('${newData.judul}');`,
        (err, results) => {
            if (err) {
                result(err);
                return;
            }
            if (newData.judul === "") {
                result({ kind: "empty_judul" }, null);
                return;
            }
            else {
                database.query(
                    `INSERT INTO berita SET ?`, newData, (err, res) => {
                        if (err) {
                            result(err);
                            return;
                        }
                        result(null, res);
                        return;
                    }
                );
            }
        }
    );

}
// update
Berita.update = (id, beritaUpdate, result) => {
    // database.query();
    database.query(
        `UPDATE berita SET judul = ?, gambar = ? ,deskripsi = ? ,waktu_input = ? WHERE id ='${id}';`,
        [beritaUpdate.judul, beritaUpdate.gambar, beritaUpdate.deskripsi, beritaUpdate.waktu_input],
        (err, results) => {
            if (err) {
                result(err, null);
                return;
            }
            if (results.affectedRows == 0) {
                result({ kind: "not_found" }, null);
                return;
            }
            result(null, {
                beritaUpdate
            });
        }
    );
}
//delete
Berita.delete = (id, result) => {
    const withoutLineBreaks = id.replace(/[\r\n]/gm, '');
    database.query(
        `SELECT id FROM berita WHERE id ='${withoutLineBreaks}';`,
        (err, results) => {
            if (err) {
                result(err);
                return;
            }
            if (results?.length) {
                database.query(
                    `DELETE FROM berita WHERE id ='${withoutLineBreaks}';`,
                    (err, results) => {
                        if (err) {
                            result(err);
                            return;
                        }
                        result(null);
                        return;
                    }
                );
            } else {
                result({ kind: "not_found" }, null);
                return;
            }
        }
    );
}
module.exports = Berita;