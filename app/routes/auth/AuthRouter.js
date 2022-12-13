module.exports = app => {
    const express = require("express");
    const router = express.Router();
    const databaseDAO = require("../../controller/auth/AuthController");
    const rolePermission = require("../../middleware/role_permission_middleware");
    const authMiddleware = require("../../middleware/auth_middleware");

    // sign up
    router.post('/signup', authMiddleware.isLoggedin, rolePermission.isAdmin, databaseDAO.signUp);
    router.post('/signup/guru', authMiddleware.isLoggedin, rolePermission.isAdmin, databaseDAO.signUpGuru);
    router.post('/signup/staff', authMiddleware.isLoggedin, rolePermission.isAdmin, databaseDAO.signUpStaff);

    // sign in
    router.post('/signin', databaseDAO.signIn);
    app.use('/api/', router);
}