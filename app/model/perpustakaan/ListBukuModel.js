const database = require("../../config/db");

const ListBuku = function (buku) {
    this.id = buku.id,
        this.judul = buku.judul,
        this.ISBN = buku.ISBN,
        this.deskripsi_buku = buku.deskripsi_buku,
        this.penulis = buku.penulis,
        this.penerbit = buku.penerbit,
        this.tahun_terbit = buku.tahun_terbit,
        this.program_studi = buku.program_studi
}
// ================ query ==============

// ==============insert=================
ListBuku.create = (buku, result) => {
    database.query(
        `SELECT id FROM perpustakaan_list_buku WHERE ISBN = '${buku.ISBN}';`,
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
                    `INSERT INTO perpustakaan_list_buku SET ?`, buku,
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
// ==============read==================
ListBuku.getAll = (result) => {
    database.query(
        `SELECT perpustakaan_list_buku.id,judul,ISBN,deskripsi_buku,penulis,penerbit,tahun_terbit,
        profil_program_studi.nama_program_studi 
        FROM perpustakaan_list_buku 
        LEFT JOIN profil_program_studi ON perpustakaan_list_buku.program_studi = profil_program_studi.id ;`,
        (err, res) => {
            if (err) {
                result(err);
                return;
            } else {
                result(null, res);
                return;
            }
        }
    );
}
ListBuku.findByIdBuku = (id_buku, result) => {
    database.query(
        `SELECT judul,ISBN,deskripsi_buku,penulis,penerbit,tahun_terbit,
        profil_program_studi.nama_program_studi 
        FROM perpustakaan_list_buku 
        LEFT JOIN profil_program_studi ON perpustakaan_list_buku.program_studi = profil_program_studi.id
        WHERE perpustakaan_list_buku.id = '${id_buku}';`,
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
ListBuku.findBySearch = (search, result) => {
    database.query(
        `SELECT judul,ISBN,deskripsi_buku,penulis,penerbit,tahun_terbit,
         profil_program_studi.nama_program_studi 
         FROM perpustakaan_list_buku 
         LEFT JOIN profil_program_studi ON perpustakaan_list_buku.program_studi = profil_program_studi.id 
         WHERE perpustakaan_list_buku.judul LIKE '%${search}%' 
         OR perpustakaan_list_buku.deskripsi_buku LIKE '%${search}%';`,
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

// =========== update ================
ListBuku.updateBuku = (id_buku, buku, result) => {
    database.query(
        `SELECT id FROM perpustakaan_list_buku WHERE id = '${id_buku}';`,
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
                    `UPDATE perpustakaan_list_buku SET judul = ?,ISBN = ?, deskripsi_buku = ?,
                    penulis = ?, penerbit = ?,tahun_terbit = ?,program_studi = ? 
                    WHERE id = '${id_buku}';`,
                    [buku.judul, buku.ISBN, buku.deskripsi_buku, buku.penulis, buku.penerbit, buku.tahun_terbit, buku.program_studi],
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
// ============ delete by id ===========
ListBuku.delete = (id_buku, result) => {
    database.query(
        `SELECT id FROM perpustakaan_list_buku WHERE id = '${id_buku}';`,
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
                    `DELETE FROM perpustakaan_list_buku WHERE id = '${id_buku}';`,
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
module.exports = ListBuku;