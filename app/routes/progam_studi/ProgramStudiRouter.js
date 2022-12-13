module.exports = app => {
    const express = require("express");
    const router = express.Router();
    const dao = require("../../controller/program_studi/ProgramStudiController");
    const auth_middleware = require("../../middleware/auth_middleware");
    const role_permission = require("../../middleware/role_permission_middleware");

    // create
    router.post('/program_studi', auth_middleware.isLoggedin, role_permission.isAdmin, dao.create);

    // read
    router.get('/program_studi', auth_middleware.isLoggedin, dao.read);

    // delete
    router.delete('/program_studi/delete/:id', auth_middleware.isLoggedin, role_permission.isAdmin, dao.delete);

    app.use('/api/', router);
}