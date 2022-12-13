module.exports = app => {
    const express = require("express");
    const router = express.Router();
    const Multer = require('multer');
    const dao = require("../../controller/berita/BeritaController");
    const rolePermission = require("../../middleware/role_permission_middleware");
    const authMiddleware = require("../../middleware/auth_middleware");
    const fileMiddleware = require("../../middleware/file/FileMiddleware");
    const multer = Multer({
        storage: Multer.memoryStorage(),
        limits: {
            fileSize: 5 * 1024 * 1024 // no larger than 5mb, you can change as needed.
        }
    });
    // create
    router.post('/berita', multer.single('file'), authMiddleware.isLoggedin, rolePermission.isAdmin, fileMiddleware.isImage, dao.insertBerita);

    // read
    router.get('/berita', authMiddleware.isLoggedin, dao.getNewsFirstPagination);
    router.get('/berita/pagination/:number_page', authMiddleware.isLoggedin, dao.getNewsWithPagination);
    router.get('/berita/:id', authMiddleware.isLoggedin, dao.findById);

    // update
    router.put('/berita/update/:id', multer.single('file'), authMiddleware.isLoggedin, rolePermission.isAdmin, fileMiddleware.isImage, dao.updateBerita);

    // delete
    router.delete('/berita/delete/:id', authMiddleware.isLoggedin, rolePermission.isAdmin, dao.deleteBerita);


    app.use('/api/', router);
}