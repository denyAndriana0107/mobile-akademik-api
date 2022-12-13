module.exports = app => {
    const express = require("express");
    const router = express.Router();
    const dao = require("../../../controller/mata_pelajaran/jadwal_siswa/JadwalController");
    const rolePermission = require("../../../middleware/role_permission_middleware");
    const authMiddleware = require("../../../middleware/auth_middleware");
    // read
    router.get('/mata_pelajaran/jadwal_siswa/:id', authMiddleware.isLoggedin, dao.readAllJadwalPerNIS);
    router.get('/mata_pelajaran/jadwal_siswa/hari/:id', authMiddleware.isLoggedin, dao.readJadwalOnthisDay);


    app.use('/api/', router);
}