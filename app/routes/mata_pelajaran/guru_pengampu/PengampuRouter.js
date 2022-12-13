module.exports = app => {
    const express = require("express");
    const router = express.Router();
    const dao = require("../../../controller/mata_pelajaran/guru_pengampu/PengampuController");
    const rolePermission = require("../../../middleware/role_permission_middleware");
    const authMiddleware = require("../../../middleware/auth_middleware");

    // create
    router.post('/mata_pelajaran/guru_pengampu', authMiddleware.isLoggedin, rolePermission.isAdmin, dao.insert);
    // read
    router.get('/mata_pelajaran/guru_pengampu/getall', authMiddleware.isLoggedin, dao.getAll);
    router.get('/mata_pelajaran/guru_pengampu/getMatpelPerguru', authMiddleware.isLoggedin, rolePermission.isGuru, dao.readMatPelPerGuruPengampu);


    app.use('/api/', router);
}