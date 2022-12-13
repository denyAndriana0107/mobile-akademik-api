const { format } = require('util');
const bucket = require("../../config/firebase/storage/firebase");
const SiswaProfilModel = require("../../model/siswa/ProfilModel");
exports.uploadFotoProfil = (req, res, next) => {
    let file = req.file;
    var data = {
        filename: req.user.username + '.jpg',
        path: req.params.jenis_upload + "/" + req.params.role + "/"
    }
    if (file) {
        uploadImageToStorage(file, data).then((success) => {
            SiswaProfilModel.uploadPhotoByNIS(req.user.username, success, (err, result) => {
                if (err) {
                    if (err.kind === "data_not_found") {
                        return res.status(404).send({
                            status: 'not_found'
                        });
                    }
                    return res.status(500).send({
                        status: err
                    });
                } else {
                    return res.status(200).send({
                        status: 'ok'
                    });
                }
            });
        }).catch((error) => {
            return res.status(500).send({
                status: error
            });
        });
    }
}
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