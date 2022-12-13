module.exports = app => {
    const express = require("express");
    const router = express.Router();
    const dao = require("../../controller/keuangan/tagihan/TagihanController");
    const auth = require("../../middleware/auth_middleware");
    const role_permission = require("../../middleware/role_permission_middleware");

    // read
    router.get('/keuangan/tagihan', auth.isLoggedin, role_permission.isSiswa, dao.getDataTagihan);

    app.use('/api/', router);
}