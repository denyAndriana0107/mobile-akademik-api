module.exports = app => {
    const express = require("express");
    const router = express.Router();
    const dao = require("../../../controller/mata_pelajaran/jadwal_guru/JadwalController");
    const rolePermission = require("../../../middleware/role_permission_middleware");
    const authMiddleware = require("../../../middleware/auth_middleware");
    // read
    router.get('/mata_pelajaran/jadwal_guru/:id', authMiddleware.isLoggedin, rolePermission.isGuru, dao.readJadwal);
    router.get('/mata_pelajaran/jadwal_guru/hari/:id', authMiddleware.isLoggedin, rolePermission.isGuru, dao.readJadwalThisDay);



    app.use('/api/', router);
}