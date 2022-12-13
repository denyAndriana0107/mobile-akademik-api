const database = require("../../config/db");
var getTimeStamps = require("../../helper/GetTimeStamps");
const PeminjamanBuku = function (buku) {
    this.id = buku.id,
        this.id_buku = buku.id_buku,
        this.tanggal_peminjaman = buku.tanggal_peminjaman,
        this.tanggal_pengembalian = buku.tanggal_pengembalian,
        this.status_peminjaman = buku.status_peminjaman,
        this.peminjaman_expired = buku.peminjaman_expired,
        this.status_pengembalian_buku = buku.status_pengembalian_buku,
        this.id_siswa = buku.id_siswa
}

// =================== query =======================

// =========insert ===================
PeminjamanBuku.create = (peminjaman_buku, result) => {
    database.query(
        `SELECT id FROM perpustakaan_peminjaman_buku WHERE id_buku = '${peminjaman_buku.id_buku}'
        AND id_siswa = '${peminjaman_buku.id_siswa}' AND status_peminjaman = 1;`, (err, res) => {
        if (err) {
            result(err);
            return;
        }
        if (res?.length) {
            result({ kind: "redundan_data" }, null);
            return;
        } else {
            database.query(
                `INSERT INTO perpustakaan_peminjaman_buku SET id = ?,id_buku = ?,tanggal_peminjaman = ?,
                tanggal_pengembalian = ?, id_siswa = ?`,
                [peminjaman_buku.id, peminjaman_buku.id_buku, peminjaman_buku.tanggal_peminjaman,
                peminjaman_buku.tanggal_pengembalian, peminjaman_buku.id_siswa],
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
// =============== read =========================
PeminjamanBuku.getAll = (result) => {
    database.query(
        `SELECT perpustakaan_peminjaman_buku.id, perpustakaan_peminjaman_buku.id_siswa, perpustakaan_list_buku.judul,
         perpustakaan_peminjaman_buku.tanggal_peminjaman, perpustakaan_peminjaman_buku.tanggal_pengembalian, 
         perpustakaan_peminjaman_buku.status_peminjaman ,perpustakaan_peminjaman_buku.peminjaman_expired,perpustakaan_peminjaman_buku.status_pengembalian_buku
         FROM perpustakaan_peminjaman_buku 
         LEFT JOIN perpustakaan_list_buku ON perpustakaan_peminjaman_buku.id_buku = perpustakaan_list_buku.id;`, (err, res) => {
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
PeminjamanBuku.findByNISSiswa = (id_siswa, result) => {
    database.query(
        `SELECT perpustakaan_peminjaman_buku.id, perpustakaan_peminjaman_buku.id_siswa, perpustakaan_list_buku.judul,
        perpustakaan_peminjaman_buku.tanggal_peminjaman, perpustakaan_peminjaman_buku.tanggal_pengembalian, 
        perpustakaan_peminjaman_buku.status_peminjaman 
        FROM perpustakaan_peminjaman_buku 
        LEFT JOIN perpustakaan_list_buku ON perpustakaan_peminjaman_buku.id_buku = perpustakaan_list_buku.id 
        WHERE id_siswa = '${id_siswa}';`,
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
// =============== update ==================
PeminjamanBuku.updateStatusPengembalianBuku = (peminjaman_buku, result) => {
    database.query(
        `SELECT id FROM perpustakaan_peminjaman_buku WHERE id ='${peminjaman_buku.id}';`,
        (err, res) => {
            console.log()
            if (err) {
                result(err);
                return;
            }
            if (!res?.length) {
                result({ kind: "data_not_found" }, null);
                return;
            } else {
                database.query(
                    `UPDATE perpustakaan_peminjaman_buku SET status_peminjaman = ? ,peminjaman_expired = ?,
                    status_pengembalian_buku = ?
                    WHERE id = '${peminjaman_buku.id}';`,
                    [peminjaman_buku.status_peminjaman, peminjaman_buku.peminjaman_expired, peminjaman_buku.status_pengembalian_buku],
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
PeminjamanBuku.updateStatusExpired = (result) => {
    database.query(
        `SELECT perpustakaan_peminjaman_buku.id, perpustakaan_peminjaman_buku.id_siswa 
        FROM perpustakaan_peminjaman_buku 
        WHERE perpustakaan_peminjaman_buku.status_peminjaman = 1 
        AND perpustakaan_peminjaman_buku.peminjaman_expired = 0
        AND perpustakaan_peminjaman_buku.tanggal_pengembalian = '${getTimeStamps.date()}';`,
        (err, res) => {
            if (err) {
                result(err);
                return;
            }
            if (!res?.length) {
                result({ kind: "data_not_found" }, null);
                return;
            } else {
                for (let i = 0; i < res.length; i++) {
                    database.query(
                        `UPDATE perpustakaan_peminjaman_buku SET peminjaman_expired = ?
                        WHERE perpustakaan_peminjaman_buku.id = '${res[i]['id']}';`,
                        [1],
                        (err, res2) => {
                            if (err) {
                                result(err);
                                return
                            } else {
                                result(null);
                                return;
                            }
                        }
                    );

                }
            }
        }
    );
}
// ============== detele =============
PeminjamanBuku.delete = (id_peminjaman, result) => {
    database.query(
        `SELECT id FROM perpustakaan_peminjaman_buku WHERE id = '${id_peminjaman}';`,
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
                    `DELETE FROM perpustakaan_peminjaman_buku WHERE id = '${id_peminjaman}';`,
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

module.exports = PeminjamanBuku;