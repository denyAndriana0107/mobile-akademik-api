const TagihanModel = require("../../../model/keuangan/tagihan/TagihanModel");
const getTimeStamps = require("../../../helper/GetTimeStamps");

exports.getDataTagihan = (req, res, next) => {
    var user = req.user.username;
    var b = user.split('_');
    user = b[b.length - 1];
    TagihanModel.getDataTagihan(user, (err, result) => {
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
            TagihanModel.sumTagihan(user, (err, result2) => {
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