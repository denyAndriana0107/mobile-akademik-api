module.exports = app => {
    const express = require("express");
    const router = express.Router();
    const dao = require("../../controller/notification/NotificationController");
    const rolePermission = require("../../middleware/role_permission_middleware");
    const authMiddleware = require("../../middleware/auth_middleware");


    // token
    router.post('/notification/push/token', authMiddleware.isLoggedin, dao.pushToken);
    app.use('/api/', router);
}