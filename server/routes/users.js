const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// userdefined modules
const pool = require("../utils/db");
const config = require("../utils/config");
const result = require("../utils/result");

const router = express.Router();

router.post("/signup", async (req, res) => {
  const { firstName, lastName, email, mobileNo, dob, password } = req.body;

  const sql = `INSERT INTO users(firstName,lastName,email,mobile,birth,password) VALUES(?,?,?,?,?,?)`;
  try {
    const hashpassword = await bcrypt.hash(password, config.saltRounds);
    pool.query(
      sql,
      [firstName, lastName, email, mobileNo, dob, hashpassword],

      (error, data) => {
        res.send(result.createResult(error, data));
      }
    );
  } catch (error) {
    res.send(result.createResult(error));
  }
});

router.post("/signin", (req, res) => {
  const { email, password } = req.body;
  const sql = `SELECT * FROM users WHERE email = ?`;
  pool.query(sql, [email], async (error, data) => {
    if (data != "") {
      const dbUser = data[0];
      const userValid = await bcrypt.compare(password, dbUser.password);
      if (userValid) {
        // body part inside the jwt that needs to be encrypted
        const payload = {
          uid: dbUser.uid,
        };
        // create the jwt token
        const token = jwt.sign(payload, config.secret);
        const user = {
          token: token,
          firstName: dbUser.firstName,
          email: dbUser.email,
        };
        res.send(result.createResult(error, user));
      } else res.send(result.createResult("Invalid Password"));
    } else res.send(result.createResult("Invalid Email"));
  });
});

router.delete("/", (req, res) => {
  const uid = req.uid;
  const sql = `DELETE FROM users WHERE user_id = ?`;
  pool.query(sql, [uid], (error, data) =>
    res.send(result.createResult(error, data))
  );
});

module.exports = router;
