const { Storage } = require('@google-cloud/storage');
const keys = require("../../../services/firebase/storage/services.json");

// init bucket storage
const storage = new Storage({ keyFilename: './app/services/firebase/storage/services.json' });
const bucket = storage.bucket(keys.storageBucket);


module.exports = bucket;