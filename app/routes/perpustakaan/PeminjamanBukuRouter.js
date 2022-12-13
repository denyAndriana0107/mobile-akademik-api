module.exports = app => {
    const express = require("express");
    const router = express.Router();
    const dao = require("../../controller/perpustakaan/PeminjamanBukuController");
    const rolePermission = require("../../middleware/role_permission_middleware");
    const authMiddleware = require("../../middleware/auth_middleware");
    // create 
    router.post('/perpustakaan/peminjaman_buku', authMiddleware.isLoggedin, rolePermission.isStaff, dao.create);

    // read
    router.get('/perpustakaan/peminjaman_buku/getall', authMiddleware.isLoggedin, dao.getAll);
    router.get('/perpustakaan/peminjaman_buku/:id', authMiddleware.isLoggedin, dao.findByNISSiswa);

    // update status peminjaman dan buku
    router.put('/perpustakaan/peminjaman_buku/update/:id', authMiddleware.isLoggedin, rolePermission.isStaff, dao.updatePeminjamanBuku);

    // delete
    router.delete('/perpustakaan/peminjaman_buku/delete/:id', authMiddleware.isLoggedin, rolePermission.isStaff, dao.delete);
    app.use('/api/', router)
}