module.exports = app => {
    const express = require("express");
    const router = express.Router();
    const dao = require("../../../controller/mata_pelajaran/profil/ProfilController");
    const rolePermission = require("../../../middleware/role_permission_middleware");
    const authMiddleware = require("../../../middleware/auth_middleware");
    // create
    router.post('/mata_pelajaran', authMiddleware.isLoggedin, rolePermission.isAdmin, dao.insertMatPel);

    // read 
    router.get('/mata_pelajaran', authMiddleware.isLoggedin, dao.readAll);
    router.get('/mata_pelajaran/:id', authMiddleware.isLoggedin, dao.findById);

    // update
    router.put('/mata_pelajaran/update/:id', authMiddleware.isLoggedin, rolePermission.isAdmin, dao.updateById);

    // delete
    router.delete('/mata_pelajaran/delete/:id', authMiddleware.isLoggedin, rolePermission.isAdmin, dao.deleteById);

    app.use('/api/', router);
}