const PembayaranModel = require("../../../model/keuangan/report_pembayaran/PembayaranModel");
const TagihanModel = require("../../../model/keuangan/tagihan/TagihanModel");
var uuid = require("uuid");
const midtrans = require("../../../config/payment_gateway");
// 
exports.create = (req, res, next) => {
    // req.body post of midtrans
    let notificationJson = {
        status_code: req.body.status_code,
        status_message: req.body.status_message,
        transaction_id: req.body.transaction_id,
        order_id: req.body.order_id,
        gross_amount: req.body.gross_amount,
        payment_type: req.body.payment_type,
        transaction_time: req.body.transaction_time,
        transaction_status: req.body.transaction_status,
        fraud_status: req.body.fraud_status,

    }
    //handling req post notification 
    midtrans.transaction.notification(notificationJson)
        .then((statusResponse) => {
            let statusCode = statusResponse.status_code;
            let statusMessage = statusResponse.status_message;
            let transactionId = statusResponse.transaction_id;
            let orderId = statusResponse.order_id;
            let gross_amount = statusResponse.gross_amount;
            let paymentType = statusResponse.payment_type;
            let transactionTime = statusResponse.transaction_time;
            let transactionStatus = statusResponse.transaction_status;
            let fraudStatus = statusResponse.fraud_status;

            // jika status sudah dibayar maka update report dan tagihan
            if (transactionStatus == 'settlement') {
                const send_database = new PembayaranModel({
                    order_id: orderId,
                    status_message: statusMessage,
                    transaction_status: transactionStatus
                });
                PembayaranModel.changeStatus(send_database, (err, result) => {
                    if (err) {
                        if (err.kind === "data_not_found") {
                            return res.status(404).send({
                                message: err
                            });
                        }
                        return res.status(500).send({
                            message: err
                        });
                    } else {
                        const send_database_tagihan = new TagihanModel({
                            id: result[0]['id_tagihan'],
                            total_sudah_bayar: gross_amount - 3000
                        });
                        TagihanModel.update(send_database_tagihan, (err, result2) => {
                            if (err) {
                                return res.status(500).send({
                                    message: err
                                });
                            } else {
                                return res.status(200).send({
                                    message: 'ok'
                                });
                            }
                        });
                    }
                });

            } else if (transactionStatus == 'deny') {
                const send_database = new PembayaranModel({
                    order_id: orderId,
                    status_message: statusMessage,
                    transaction_status: transactionStatus
                });
                PembayaranModel.changeStatus(send_database, (err, result) => {
                    if (err) {
                        if (err.kind === "data_not_found") {
                            return res.status(404).send({
                                message: err
                            });
                        }
                        return res.status(500).send({
                            message: err
                        });
                    } else {
                        return res.status(200).send({
                            message: 'ok'
                        });
                    }
                });
            } else if (transactionStatus == 'cancel' ||
                transactionStatus == 'expire') {
                const send_database = new PembayaranModel({
                    order_id: orderId,
                    status_message: statusMessage,
                    transaction_status: transactionStatus
                });
                PembayaranModel.changeStatus(send_database, (err, result) => {
                    if (err) {
                        if (err.kind === "data_not_found") {
                            return res.status(404).send({
                                message: err
                            });
                        }
                        return res.status(500).send({
                            message: err
                        });
                    } else {
                        return res.status(200).send({
                            message: 'ok'
                        });
                    }
                });
            } else if (transactionStatus == 'pending') {
                var array_data = orderId.split(' ');
                const send_database = new PembayaranModel({
                    id: uuid.v4().substring(0, 10),
                    id_siswa: array_data[0],
                    id_tagihan: array_data[1],
                    status_code: statusCode,
                    status_message: statusMessage,
                    transaction_id: transactionId,
                    order_id: orderId,
                    gross_amount: gross_amount,
                    payment_type: paymentType,
                    transaction_time: transactionTime,
                    transaction_status: transactionStatus,
                    fraud_status: fraudStatus
                });
                PembayaranModel.paymentInsertToDatabase(send_database, (err, result) => {
                    if (err) {
                        return res.status(500).send({
                            message: err
                        });
                    } else {
                        return res.status(200).send({
                            message: 'ok'
                        });
                    }
                });
            }
        });
}