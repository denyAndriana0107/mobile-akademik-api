const database = require("../../config/db");

const GuruModel = function (guru) {
    this.id = guru.id,
        this.nip = guru.username,
        this.status_guru = guru.status_guru
}

// insert guru primary references
GuruModel.create = (newguru, result) => {
    database.query(
        `INSERT INTO guru SET ?`, newguru, (err, results) => {
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

module.exports = GuruModel;