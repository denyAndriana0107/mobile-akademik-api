module.exports = app => {
    const express = require("express");
    const router = express.Router();
    const Multer = require('multer');
    const dao = require("../../controller/guru/UploadFotoProfilController");
    const rolePermission = require("../../middleware/role_permission_middleware");
    const authMiddleware = require("../../middleware/auth_middleware");
    const fileMiddleware = require("../../middleware/file/FileMiddleware");
    const multer = Multer({
        storage: Multer.memoryStorage(),
        limits: {
            fileSize: 5 * 1024 * 1024 // no larger than 5mb, you can change as needed.
        }
    });
    router.post('/guru/profil/upload_foto/:role/:jenis_upload', multer.single('file'), authMiddleware.isLoggedin, rolePermission.isGuru, fileMiddleware.isImage, dao.uploadFotoProfil);
    app.use('/api/', router);
}