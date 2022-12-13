$(document).ready(function () {
    $("button").click(function () {
        var base_url = window.location.origin;
        var token = document.querySelectorAll('#snap_token')[0].value;
        var id_siswa = document.querySelectorAll('#id_siswa')[0].value;
        var id_tagihan = document.querySelectorAll('#id_tagihan')[0].value;
        snap.pay(token, {
            onSuccess: function (result) {
                window.location.replace(window.location.href);
            },
            onPending: function (result) {
                var send_pdf_pembayaran = result['pdf_url'];
                window.location.replace(send_pdf_pembayaran);
            },
            onError: function () {
                window.location.replace("/error");
            },
            onClose: function () {
                window.location.replace(window.location.href);
            }
        });

    });
});