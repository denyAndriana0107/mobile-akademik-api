module.exports = app => {
    const express = require("express");
    const router = express.Router();
    const dao = require("../../../../controller/mata_pelajaran/nilai/role_siswa/NilaiController");
    const auth_middleware = require("../../../../middleware/auth_middleware");
    const role_permission_middleware = require("../../../../middleware/role_permission_middleware");

    // read
    router.post('/mata_pelajaran/nilai/siswa', auth_middleware.isLoggedin, role_permission_middleware.isSiswa, dao.readNilai);

    app.use('/api/', router);
}