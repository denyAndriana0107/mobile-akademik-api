module.exports = app => {
    const express = require("express");
    const router = express.Router();
    const dao = require("../../../controller/kelas/daftar_siswa/KelasController");
    const auth = require("../../../middleware/auth_middleware");
    const role_pemission = require("../../../middleware/role_permission_middleware");

    // insert siswa ke kelas
    router.post('/kelas/siswa', auth.isLoggedin, role_pemission.isAdmin, dao.create);

    // read
    router.get('/kelas/siswa/:id_siswa', auth.isLoggedin, dao.read_data_kelas_persiswa);
    router.get('/kelas/siswa/daftar_siswa/:id', auth.isLoggedin, dao.read_daftar_siswa_perkelas);

    app.use('/api/', router);
}