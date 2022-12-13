module.exports = app => {
    const express = require("express");
    const router = express.Router();
    const dao = require("../../../controller/kelas/profil_kelas/KelasController");
    const auth = require("../../../middleware/auth_middleware");
    const role_pemission = require("../../../middleware/role_permission_middleware");

    // create
    router.post('/kelas', auth.isLoggedin, role_pemission.isAdmin, dao.create);

    // read
    router.get('/kelas', dao.readCount);
    router.get('/kelas/list', auth.isLoggedin, dao.getDaftarKelas);
    router.get('/kelas/list/role_guru/:id_matpel', auth.isLoggedin, role_pemission.isGuru, dao.getDaftarKelasPerguruPerMatpel);

    // update wali kelas
    router.put('/kelas/update/wali_kelas/:id', auth.isLoggedin, role_pemission.isAdmin, dao.updateWaliKelas);

    // delete
    router.delete('/kelas/delete/:id', auth.isLoggedin, role_pemission.isAdmin, dao.delete);

    app.use('/api/', router);
}