const beritaModel = require("../../model/berita/BeritaModel");
const { randomUUID } = require('crypto');
const { format } = require('util');
const bucket = require("../../config/firebase/storage/firebase");
const notification = require("../../model/notification/NotificationModel");
// TimeStamp
var getTimeStamp = require("../../helper/GetTimeStamps");
let timestamp = getTimeStamp.timestamp();



// ========== getAll data Berita =============
exports.getNewsFirstPagination = (req, res, next) => {
    beritaModel.getNewsFirstPagination((err, result) => {
        if (err) {
            return res.status(500).send({
                message:
                    err.message
            });
        } else {
            return res.status(200).send({
                berita: result
            });
        }
    });
}
exports.getNewsWithPagination = (req, res, next) => {
    beritaModel.getNewsPagination(req.params.number_page, (err, result) => {
        if (err) {
            return res.status(500).send({
                message:
                    err.message
            });
        } else {
            return res.status(200).send({
                berita: result
            });
        }
    });
}

// ============= get data by id ============
exports.findById = (req, res, next) => {
    beritaModel.findById(req.params.id, (err, result) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: 'not_found'
                });
            } else {
                res.status(500).send({
                    message: err
                });
            }
        } else res.status(200).send({
            message: result
        });
    });
}

// ============ insert data berita =============
exports.insertBerita = (req, res, next) => {
    if (!req.body) {
        res.status(400).send({
            message: "Field harus diisi"
        });
    }
    let file = req.file;
    var data = {
        filename: randomUUID().substring(0, 10) + '.jpg',
        path: "foto_berita/"
    }
    if (file) {
        uploadImageToStorage(file, data).then((success) => {
            const berita = new beritaModel({
                id: randomUUID().substring(0, 10),
                judul: req.body.judul,
                gambar: success,
                deskripsi: req.body.deskripsi,
                waktu_input: timestamp
            });
            beritaModel.create(berita, (err, result) => {
                if (err) {
                    if (err.kind === "empty_judul") {
                        return res.status(200).send({
                            message: err
                        });
                    }
                    return res.status(500).send({
                        message:
                            err.message
                    });
                } else {
                    const notif_data = {
                        title: req.body.judul,
                        body: req.body.deskripsi.substring(0, 20) + "...",
                        topic: "Berita"
                    };
                    notification.createMessageToAll(notif_data, (error, result) => {
                        if (error) {
                            return res.status(500).send({
                                message: "Notif error" + error
                            });
                        } else {
                            return res.status(201).send({
                                message: "ok"
                            });
                        }
                    })
                }
            });
        });
    }
}

// update berita
exports.updateBerita = (req, res, next) => {
    if (!req.body) {
        res.status(400).send({
            message: "Field harus diisi"
        });
    }
    let file = req.file;
    var data = {
        filename: req.params.id + '.jpg',
        path: "foto_berita/"
    }
    if (file) {
        uploadImageToStorage(file, data).then((success) => {
            const berita = new beritaModel({
                id: req.params.id,
                judul: req.body.judul,
                gambar: success,
                deskripsi: req.body.deskripsi,
                waktu_input: timestamp
            });
            beritaModel.update(req.params.id, berita, (err, result) => {
                if (err) {
                    if (err.kind === "not_found") {
                        res.status(404).send({
                            message: `not_found`
                        });
                    } else {
                        res.status(500).send({
                            message: err
                        });
                    }
                } else res.status(200).send({
                    message: "update berita sukses"
                });
            });
        })
    }
}

// delete berita by id
exports.deleteBerita = (req, res, next) => {
    beritaModel.delete(req.params.id, (err, result) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `not_found`
                });
            } else {
                res.status(500).send({
                    message: err
                });
            }
        }
        else res.status(200).send({
            message: "delete sukses",
        });

    });
}

// upload foto fungsi
const uploadImageToStorage = (file, data) => {
    return new Promise((resolve, reject) => {
        if (!file) {
            reject('No image file');
        }
        let newFileName = data.filename;
        let path = data.path;
        let fileUpload = bucket.file(path + newFileName);

        const blobStream = fileUpload.createWriteStream({
            metadata: {
                contentType: file.mimetype
            }
        });

        blobStream.on('error', (error) => {
            reject(error.message);
        });
        var new_path = path.replaceAll('/', '%2F');
        blobStream.on('finish', () => {
            const url = format(`https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${new_path}${newFileName}?alt=media`);
            resolve(url);
        });
        blobStream.end(file.buffer);
    });
}