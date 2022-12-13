module.exports = app => {
    const express = require("express");
    const router = express.Router();
    const databaseDAO = require("../../controller/guru/ProfilController");
    const rolePermission = require("../../middleware/role_permission_middleware");
    const authMiddleware = require("../../middleware/auth_middleware");

    // create 
    router.post('/guru/profil', authMiddleware.isLoggedin, rolePermission.isGuru, databaseDAO.insertProfilGuruModel);

    // read
    router.get('/guru/profil/:id', authMiddleware.isLoggedin, databaseDAO.findProfilGuruModelByNIP);

    // modify
    router.put('/guru/profil/update', authMiddleware.isLoggedin, rolePermission.isGuru, databaseDAO.updateProfilGuruModelByNIP);

    // delete
    router.delete('/guru/profil/delete', authMiddleware.isLoggedin, rolePermission.isGuru, databaseDAO.deleteProfilGuruModelByNIP);

    app.use('/api/', router);
}