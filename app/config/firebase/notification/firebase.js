const admin = require("firebase-admin");
var serviceAccount = require("../../../services/firebase/notification/services.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

module.exports = admin;