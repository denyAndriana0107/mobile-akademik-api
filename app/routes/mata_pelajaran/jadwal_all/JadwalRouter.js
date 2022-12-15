module.exports = app => {
    const express = require("express");
    const router = express.Router();
    const dao = require("../../../controller/mata_pelajaran/jadwal_all/JadwalController");
    const rolePermission = require("../../../middleware/role_permission_middleware");
    const authMiddleware = require("../../../middleware/auth_middleware");
    // create
    router.post('/mata_pelajaran/jadwal/admin', dao.readcsvfile);


    app.use('/api/', router);
}