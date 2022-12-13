module.exports = app => {
    const express = require("express");
    const router = express.Router();
    const dao = require("../../controller/perpustakaan/ListBukuController");
    const rolePermission = require("../../middleware/role_permission_middleware");
    const authMiddleware = require("../../middleware/auth_middleware");
    // create
    router.post('/perpustakaan/list_buku', authMiddleware.isLoggedin, rolePermission.isStaff, dao.insert);

    // read
    router.get('/perpustakaan/list_buku', authMiddleware.isLoggedin, dao.getAll);
    router.get('/perpustakaan/list_buku/:id', authMiddleware.isLoggedin, dao.findByID);
    router.get('/perpustakaan/list_buku/search/:keyword', authMiddleware.isLoggedin, dao.findBySearch);

    // update
    router.put('/perpustakaan/list_buku/update/:id', authMiddleware.isLoggedin, rolePermission.isStaff, dao.updateBuku);

    // delete
    router.delete('/perpustakaan/list_buku/delete/:id', authMiddleware.isLoggedin, rolePermission.isStaff, dao.delete);

    app.use('/api/', router);
}