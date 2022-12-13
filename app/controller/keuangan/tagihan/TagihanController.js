const TagihanModel = require("../../../model/keuangan/tagihan/TagihanModel");
const getTimeStamps = require("../../../helper/GetTimeStamps");

exports.getDataTagihan = (req, res, next) => {
    TagihanModel.getDataTagihan(req.user.username, (err, result) => {
        if (err) {
            if (err.kind === "data_not_found") {
                return res.status(404).send({
                    message: "not_found"
                });
            }
            return res.status(500).send({
                message: err
            });
        } else {
            TagihanModel.sumTagihan(req.user.username, (err, result2) => {
                if (err) {
                    if (err.kind === "data_not_found") {
                        return res.status(404).send({
                            message: "not_found"
                        });
                    }
                    return res.status(500).send({
                        message: err
                    });
                } else {
                    var message = { data_tagihan: result, total_tagihan: result2 };
                    return res.status(200).send({
                        message
                    });
                }
            });
        }
    });
}