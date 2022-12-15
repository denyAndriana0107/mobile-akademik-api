module.exports = app => {
    const express = require("express");
    const router = express.Router();
    const dao = require("../../controller/orang_tua/ibu/ProfilController");
    const dao1 = require("../../controller/orang_tua/ayah/ProfilController");
    const rolePermission = require("../../middleware/role_permission_middleware");
    const authMiddleware = require("../../middleware/auth_middleware");

    // create
    router.post('/orangtua/ibu/profil', authMiddleware.isLoggedin, rolePermission.isSiswa, dao.insertProfilIbu);
    router.post('/orangtua/ayah/profil', authMiddleware.isLoggedin, rolePermission.isSiswa, dao1.insertProfilAyah);


    // read
    router.get('/orangtua/ibu/profil/:id', authMiddleware.isLoggedin, dao.findProfilIbuByNIS);
    router.get('/orangtua/ayah/profil/:id', authMiddleware.isLoggedin, dao1.findProfilAyahByNIS);

    // update
    router.put('/orangtua/ibu/profil/update', authMiddleware.isLoggedin, rolePermission.isSiswa, dao.updateProfilIbuByNIS);
    router.put('/orangtua/ayah/profil/update', authMiddleware.isLoggedin, rolePermission.isSiswa, dao1.updateProfilAyahByNIS);

    // delete
    router.delete('/orangtua/ibu/profil/delete', authMiddleware.isLoggedin, rolePermission.isSiswa, dao.deleteProfilIbuByNIS);
    router.delete('/orangtua/ayah/profil/delete', authMiddleware.isLoggedin, rolePermission.isSiswa, dao1.deleteProfilAyahByNIS);

    app.use('/api/', router);
}