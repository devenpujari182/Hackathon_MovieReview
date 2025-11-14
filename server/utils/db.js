const mysql = require("mysql2");
const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "Manu@1210",
  database: "hackathon",
});

module.exports = pool;
