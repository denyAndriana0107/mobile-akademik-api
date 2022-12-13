const midtransClient = require('midtrans-client');
require("dotenv").config();
let snap = new midtransClient.Snap({
    isProduction: false,
    serverKey: process.env.SERVER_KEY,
    clientKey: process.env.CLIENT_KEY
});
module.exports = snap;