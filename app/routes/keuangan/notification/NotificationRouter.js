module.exports = app => {
    const express = require("express");
    const router = express.Router();
    const dao = require("../../../controller/keuangan/notification/NotificationController");

    router.post('/keuangan/notification', dao.create);
    app.use('/api/', router);
}