module.exports = app => {
    const express = require("express");
    const router = express.Router();
    const dao = require("../../../controller/presensi/siswa/PresensiController");
    const rolePermission = require("../../../middleware/role_permission_middleware");
    const authMiddleware = require("../../../middleware/auth_middleware");

    // presensi
    router.post('/presensi/siswa', authMiddleware.isLoggedin, rolePermission.isSiswa, dao.presensiSiswa);

    // read 
    router.get('/presensi/siswa/status', authMiddleware.isLoggedin, rolePermission.isSiswa, dao.getStatusPresensiNow);
    router.get('/presensi/siswa/calculate', authMiddleware.isLoggedin, rolePermission.isSiswa, dao.calculatePresentaseKehadiran);
    app.use('/api/', router);
}