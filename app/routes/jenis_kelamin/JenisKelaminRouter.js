module.exports = app => {
    const express = require("express");
    const router = express.Router();
    const dao = require("../../controller/jenis_kelamin/JenisKelaminController");
    const authMiddleware = require("../../middleware/auth_middleware");

    router.get('/jenis_kelamin/list', authMiddleware.isLoggedin, dao.readAll);
    router.get('/jenis_kelamin/:id', authMiddleware.isLoggedin, dao.readById);
    app.use('/api/', router);
}