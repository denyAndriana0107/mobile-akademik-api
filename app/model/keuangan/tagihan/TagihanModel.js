const database = require("../../../config/db");
const timeStamp = require("../../../helper/GetTimeStamps");
var uuid = require("uuid");
const TagihanModel = function (tagihan) {
    this.id = tagihan.id,
        this.id_siswa = tagihan.id_siswa,
        this.bulan = tagihan.bulan,
        this.tahun_ajaran = tagihan.tahun_ajaran,
        this.tagihan = tagihan.tagihan,
        this.total_sudah_bayar = tagihan.total_sudah_bayar,
        this.inputed = tagihan.inputed,
        this.last_update = tagihan.last_update
}
// ================ create =======================
TagihanModel.create = (result) => {
    database.query(
        `SELECT id_siswa FROM kelas_daftar_siswa_perkelas 
        LEFT JOIN siswa ON kelas_daftar_siswa_perkelas.id_siswa = siswa.nis 
        WHERE siswa.status_akademik = 1;`, (err, res) => {
        if (err) {
            result(err);
            return;
        }
        if (!res?.length) {
            result({ kind: "data_not_found" }, null);
            return;
        } else {
            var data_date = timeStamp.date();
            var array_date = data_date.split("-");
            var tahun_ajaran = "";
            if (array_date[1] > 5) {
                tahun_ajaran = `${array_date[0]}/${array_date[0] + 1}`;
            } else {
                tahun_ajaran = `${array_date[0] - 1}/${array_date[0]}`;
            }

            for (let index = 0; index < res.length; index++) {
                database.query(
                    `INSERT INTO keuangan_tagihan SET id = ?, id_siswa = ?, bulan = ?,tahun_ajaran = ?,
                        tagihan = ?, total_sudah_bayar = ?,inputed = ?, last_update = ?`,
                    [`${uuid.v4().substring(0, 10)}`, `${res[index]['id_siswa']}`, (array_date[1] - 1), `${tahun_ajaran}`, 150000, 0, timeStamp.timestamp(), null],
                    (err, res2) => {
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
    }
    );
}
// ================ read =======================
TagihanModel.getDataTagihan = (id_siswa, result) => {
    database.query(
        `SELECT keuangan_tagihan.id, keuangan_tagihan.bulan, keuangan_tagihan.tahun_ajaran, SUM(keuangan_tagihan.tagihan-keuangan_tagihan.total_sudah_bayar) AS tagihan 
        ,IF(SUM(keuangan_tagihan.tagihan-keuangan_tagihan.total_sudah_bayar)>0,"Belum Lunas","Lunas") AS status_tagihan
        FROM keuangan_tagihan
        WHERE keuangan_tagihan.id_siswa = '${id_siswa}'
        GROUP BY keuangan_tagihan.id;`, (err, res) => {
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
TagihanModel.sumTagihan = (id_siswa, result) => {
    database.query(
        `SELECT SUM(keuangan_tagihan.tagihan-keuangan_tagihan.total_sudah_bayar) AS total_tagihan FROM keuangan_tagihan 
        WHERE keuangan_tagihan.id_siswa = '${id_siswa}';`, (err, res) => {
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
TagihanModel.sumTagihanPerTagihan = (id_siswa, id_tagihan, result) => {
    database.query(
        `SELECT SUM(keuangan_tagihan.tagihan-keuangan_tagihan.total_sudah_bayar) AS total_tagihan FROM keuangan_tagihan 
        WHERE keuangan_tagihan.id_siswa = '${id_siswa}'
        AND keuangan_tagihan.id = '${id_tagihan}';`, (err, res) => {
        if (err) {
            result(err);
            return;
        }
        if (res[0]['total_tagihan'] == null) {
            result({ kind: "data_not_found" }, null);
            return;
        } else {
            result(null, res);
            return;
        }
    }
    );
}

// ================ update =====================
TagihanModel.update = (data, result) => {
    database.query(
        `SELECT keuangan_tagihan.id FROM keuangan_tagihan 
        WHERE keuangan_tagihan.id = '${data.id}';`, (err, res) => {
        if (err) {
            result(err);
            return;
        }
        if (!res?.length) {
            result({ kind: "data_not_found" }, null);
            return;
        } else {
            database.query(
                `UPDATE keuangan_tagihan SET total_sudah_bayar = ?, last_update = ?
                WHERE keuangan_tagihan.id = '${data.id}';`,
                [data.total_sudah_bayar, timeStamp.timestamp()], (err, res) => {
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

module.exports = TagihanModel;