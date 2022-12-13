const mysql = require("mysql");
require("dotenv").config();

const pool = mysql.createPool({
    connectionLimit: 100,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
})
pool.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
    if (error) {
        console.log(error);
    }
    else {
        console.log("Connected!");
    }
});
module.exports = pool;