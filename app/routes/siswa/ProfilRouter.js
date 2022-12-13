module.exports = app => {
    const express = require("express");
    const router = express.Router();
    const dao = require("../../controller/siswa/ProfilController");
    const rolePermission = require("../../middleware/role_permission_middleware");
    const authMiddleware = require("../../middleware/auth_middleware");
    // create
    router.post('/siswa/profil', authMiddleware.isLoggedin, rolePermission.isSiswa, dao.insertProfilSiswa);

    // read
    router.get('/siswa/profil/:id', authMiddleware.isLoggedin, dao.findProfilByNIS);

    // delete
    router.delete('/siswa/profil/delete', authMiddleware.isLoggedin, rolePermission.isSiswa, dao.deleteProfilByNis);

    // update 
    router.put('/siswa/profil/update', authMiddleware.isLoggedin, rolePermission.isSiswa, dao.updateProfilByNIS);

    app.use('/api/', router);
}