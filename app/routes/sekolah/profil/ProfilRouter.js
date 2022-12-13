module.exports = app => {
    const express = require("express");
    const router = express.Router();
    const dao = require("../../../controller/sekolah/profil/ProfilController");
    const rolePermission = require("../../../middleware/role_permission_middleware");
    const authMiddleware = require("../../../middleware/auth_middleware");

    // update
    router.put('/sekolah/profil/update', authMiddleware.isLoggedin, rolePermission.isAdmin, dao.update);

    // read
    router.get('/sekolah/profil', dao.read)
    app.use('/api/', router);

}