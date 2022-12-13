module.exports = app => {
    const express = require("express");
    const router = express.Router();
    const dao = require("../../controller/keuangan/report_pembayaran/PembayaranController");
    const auth = require("../../middleware/auth_middleware");
    const role_permission = require("../../middleware/role_permission_middleware");
    // read
    router.get('/keuangan/pembayaran/:id_tagihan', auth.isLoggedin, role_permission.isSiswa, dao.payment);

    // create
    // router.post('/keuangan/pembayaran/database', dao.paymentInsertToDatabase);

    app.use('/api/', router);
}