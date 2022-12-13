const database = require("../../../config/db");
const PembayaranModel = function (payment) {
    this.id = payment.id,
        this.id_siswa = payment.id_siswa,
        this.id_tagihan = payment.id_tagihan,
        this.status_code = payment.status_code,
        this.status_message = payment.status_message,
        this.transaction_id = payment.transaction_id,
        this.order_id = payment.order_id,
        this.gross_amount = payment.gross_amount,
        this.payment_type = payment.payment_type,
        this.transaction_time = payment.transaction_time,
        this.transaction_status = payment.transaction_status,
        this.fraud_status = payment.fraud_status
}
// ================ pembayaran ===================
PembayaranModel.paymentInsertToDatabase = (payment, result) => {
    database.query(
        `INSERT INTO keuangan_report SET ?`, payment, (err, res) => {
            if (err) {
                result(err);
                return;
            } else {
                result(null);
                return;
            }
        }
    );
}
PembayaranModel.changeStatus = (data, result) => {
    database.query(
        `SELECT keuangan_report.id, keuangan_report.id_tagihan 
        FROM keuangan_report 
        WHERE keuangan_report.order_id = '${data.order_id}';`, (err, res) => {
        if (err) {
            result(err);
            return;
        }
        if (!res?.length) {
            result({ kind: "data_not_found" }, null);
            return;
        } else {
            database.query(
                `UPDATE keuangan_report SET status_message = ?, transaction_status = ?
                    WHERE keuangan_report.order_id = '${data.order_id}';`,
                [data.status_message, data.transaction_status], (err, res2) => {
                    if (err) {
                        result(err);
                        return;
                    } else {
                        result(null, res);
                        return;
                    }
                }
            );
        }
    }
    );

}
module.exports = PembayaranModel; 