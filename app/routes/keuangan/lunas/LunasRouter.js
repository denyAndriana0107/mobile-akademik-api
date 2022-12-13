module.exports = app => {
    const express = require("express");
    const router = express.Router();

    router.get('/keuangan/lunas', function (req, res) {
        return res.render('views/payment_lunas');
    });
    app.use('/api/', router);
}