module.exports = {
    rangeNilai: (req, res, next) => {
        if (req.body.nilai < 0 && req.body.nilai > 100) {
            return res.status(500).send({
                message: "Range Nilai 0-100"
            })
        }
        next();
    }
}