module.exports = app => {
    const express = require("express");
    const router = express.Router();
    const dao = require("../../../../controller/mata_pelajaran/nilai/role_siswa/NilaiController");
    const auth_middleware = require("../../../../middleware/auth_middleware");
    const role_permission_middleware = require("../../../../middleware/role_permission_middleware");
    const nilai_middleware = require("../../../../middleware/nilai/NilaiMiddleware");

    // read
    router.post('/mata_pelajaran/nilai/siswa', auth_middleware.isLoggedin, role_permission_middleware.isSiswaOrOrangTua, nilai_middleware.semester, dao.readNilai);
    router.get('/mata_pelajaran/nilai/siswa/transkrip', auth_middleware.isLoggedin, role_permission_middleware.isSiswaOrOrangTua, dao.transkripNilai);
    router.get('/mata_pelajaran/nilai/siswa/ranking', auth_middleware.isLoggedin, role_permission_middleware.isSiswaOrOrangTua, nilai_middleware.semester, dao.rankingSiswaPerKelasPerSemester);
    router.get('/mata_pelajaran/nilai/siswa/listRanking', auth_middleware.isLoggedin, role_permission_middleware.isSiswaOrOrangTua, nilai_middleware.semester, dao.listRankingSiswaPerKelasPerSemester);

    app.use('/api/', router);
}