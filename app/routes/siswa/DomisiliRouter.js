module.exports = app => {
    const express = require("express");
    const router = express.Router();
    const dao = require("../../controller/siswa/DomisiliController");
    const rolePermission = require("../../middleware/role_permission_middleware");
    const authMiddleware = require("../../middleware/auth_middleware");
    // insert
    router.post('/siswa/profil/domisili', authMiddleware.isLoggedin, rolePermission.isSiswa, dao.insertDomisiliSiswa);

    // read 
    router.get('/siswa/profil/domisili/:id', authMiddleware.isLoggedin, dao.findDomisiliSiswaByNIS);

    // delete
    router.delete('/siswa/profil/domisili/delete', authMiddleware.isLoggedin, rolePermission.isSiswa, dao.deleteDomisiliSiswaByNIS);

    // update
    router.put('/siswa/profil/domisili/update', authMiddleware.isLoggedin, rolePermission.isSiswa, dao.updateDomisiSiswaByNIS);

    app.use('/api/', router);
}