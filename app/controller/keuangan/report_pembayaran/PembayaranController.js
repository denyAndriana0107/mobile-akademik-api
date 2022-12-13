const snap = require("../../../config/payment_gateway");
const PembayaranModel = require("../../../model/keuangan/report_pembayaran/PembayaranModel");
const Tagihan = require("../../../model/keuangan/tagihan/TagihanModel");
var getTimeStamps = require("../../../helper/GetTimeStamps");
var uuid = require("uuid");

// snap midtranst
exports.payment = (req, res, next) => {
    var order_id = req.user.username + " " + req.params.id_tagihan + " " + uuid.v4().substring(0, 5);
    Tagihan.sumTagihanPerTagihan(req.user.username, req.params.id_tagihan, (err, result) => {
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
            if (result[0]['total_tagihan'] == 0) {
                return res.redirect('/api/keuangan/lunas');
            } else {
                let parameter = {
                    "transaction_details": {
                        "order_id": order_id,
                        "gross_amount": result[0]['total_tagihan'] + 3000
                    }, "credit_card": {
                        "secure": true
                    }
                };
                snap.createTransactionToken(parameter)
                    .then((transactionToken) => {
                        return res.render('views/payment', {
                            order_id: order_id,
                            id_siswa: req.user.username,
                            id_tagihan: req.params.id_tagihan,
                            tagihan: result[0]['total_tagihan'],
                            date: getTimeStamps.date(),
                            biaya_admin: 3000,
                            token: transactionToken,
                            clientKey: snap.apiConfig.clientKey
                        })
                    });
            }

        }
    })

}
// insert to database
exports.paymentInsertToDatabase = (req, res, next) => {
    const data = new PembayaranModel({
        id: uuid.v4().substring(0, 10),
        id_siswa: req.body.id_siswa,
        id_tagihan: req.body.id_tagihan,
        status_code: req.body.status_code,
        status_message: req.body.status_message,
        transaction_id: req.body.transaction_id,
        order_id: req.body.order_id,
        gross_amount: req.body.gross_amount,
        payment_type: req.body.payment_type,
        transaction_time: req.body.transaction_time,
        transaction_status: req.body.transaction_status,
        fraud_status: req.body.fraud_status
    });
    PembayaranModel.paymentInsertToDatabase(data, (err, result) => {
        if (err) {
            return res.status(500).send({
                message: err
            });
        } else {
            return res.status(201).send({
                message: "Insert data pembayaran sukses"
            });
        }
    });
}