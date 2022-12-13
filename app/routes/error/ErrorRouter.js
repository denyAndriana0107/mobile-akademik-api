module.exports = app => {
    const express = require("express");
    const router = express.Router();

    router.get('/error', function (req, res, next) {
        return res.render('views/error');
    })

    app.use(router);
}