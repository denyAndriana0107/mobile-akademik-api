module.exports = app => {
    const express = require("express");
    const router = express.Router();
    const dao = require("../../../../controller/mata_pelajaran/nilai/role_guru/NilaiController");
    const rolePermission = require("../../../../middleware/role_permission_middleware");
    const authMiddleware = require("../../../../middleware/auth_middleware");
    // create 
    router.post('/mata_pelajaran/nilai/guru/:id_mata_pelajaran/:id_kelas/:id_siswa', authMiddleware.isLoggedin, rolePermission.isGuru, dao.create);

    // read
    router.get('/mata_pelajaran/nilai/guru/nilai_final/:id_mata_pelajaran/:id_kelas', authMiddleware.isLoggedin, rolePermission.isGuru, dao.readFinalNilai);
    router.get('/mata_pelajaran/nilai/guru/getall/:id_mata_pelajaran/:id_kelas', authMiddleware.isLoggedin, rolePermission.isGuru, dao.readNilai);
    // update 

    // delete

    app.use('/api/', router)
}