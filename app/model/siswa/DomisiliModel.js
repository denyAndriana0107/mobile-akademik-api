const database = require("../../config/db");
const DomisiliSiswa = function (domisili) {
    this.id = domisili.id,
        this.provinsi = domisili.provinsi,
        this.kabupaten = domisili.kabupaten,
        this.kecamatan = domisili.kecamatan,
        this.kelurahan = domisili.kelurahan,
        this.RW = domisili.RW,
        this.RT = domisili.RT,
        this.alamat_lengkap = domisili.alamat_lengkap,
        this.id_siswa = domisili.id_siswa
}

// ========== Query =========

// insert
DomisiliSiswa.insert = (id_siswa, newDomisili, result) => {
    const withoutLineBreaks = id_siswa.replace(/[\r\n]/gm, '');
    database.query(
        `SELECT id FROM profil_alamat_siswa WHERE id_siswa = '${withoutLineBreaks}';`,
        (err, res) => {
            if (err) {
                result(err);
                return;
            }
            if (res?.length) {
                result({ kind: "redundan_profil" }, null);
                return;
            } else {
                database.query(
                    `INSERT INTO profil_alamat_siswa SET ?`, newDomisili,
                    (err, res) => {
                        if (err) {
                            result(err);
                            return;
                        }
                        result(null);
                        return;
                    }
                );
            }
        }
    );
}
// read 
DomisiliSiswa.findDomisiliSiswaByNIS = (id_siswa, result) => {
    const withoutLineBreaks = id_siswa.replace(/[\r\n]/gm, '');
    database.query(
        `SELECT profil_alamat_siswa.id_siswa,profil_alamat_siswa.provinsi,profil_alamat_siswa.kabupaten,
        profil_alamat_siswa.kecamatan,profil_alamat_siswa.kelurahan,profil_alamat_siswa.RW,profil_alamat_siswa.RT,
        profil_alamat_siswa.alamat_lengkap FROM profil_alamat_siswa 
        WHERE id_siswa = '${withoutLineBreaks}';`,
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
DomisiliSiswa.deleteDomisiliSiswaByNIS = (id_siswa, result) => {
    const withoutLineBreaks = id_siswa.replace(/[\r\n]/gm, '');
    database.query(
        `SELECT id FROM profil_alamat_siswa WHERE id_siswa = '${withoutLineBreaks}';`,
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
                    `DELETE FROM profil_alamat_siswa WHERE id_siswa = '${withoutLineBreaks}';`,
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
DomisiliSiswa.updateDomisiliSiswaByNIS = (id_siswa, domisili, result) => {
    const withoutLineBreaks = id_siswa.replace(/[\r\n]/gm, '');
    database.query(
        `SELECT id FROM profil_alamat_siswa WHERE id_siswa = '${withoutLineBreaks}';`,
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
                    `UPDATE profil_alamat_siswa SET provinsi = ?,kabupaten = ?,
                    kecamatan = ?,kelurahan = ?,RW = ?,RT = ?,alamat_lengkap = ? WHERE id_siswa = '${withoutLineBreaks}';`,
                    [domisili.provinsi, domisili.kabupaten, domisili.kecamatan, domisili.kelurahan, domisili.RW, domisili.RT, domisili.alamat_lengkap],
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
module.exports = DomisiliSiswa;