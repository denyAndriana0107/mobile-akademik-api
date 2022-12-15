module.exports = {
    rangeNilai: (req, res, next) => {
        if (req.body.nilai < 0 && req.body.nilai > 100) {
            return res.status(500).send({
                message: "Range Nilai 0-100"
            })
        }
        next();
    },
    semester: (req, res, next) => {
        if (req.body.semester != 0 && req.body.semester != 1) {
            return res.status(500).send({
                message: `value semester \n semester = 0 untuk genap dan semester = 1 untuk ganjil`
            })
        }
        next();
    }

}