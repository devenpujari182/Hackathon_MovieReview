const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// userdefined modules
const pool = require("../utils/db");
const config = require("../utils/config");
const result = require("../utils/result");

const router = express.Router();

router.post("/signup", async (req, res) => {
  const { firstName, lastName, email, mobile, birth, password } = req.body;
  const sql = `INSERT INTO users(firstName,lastName,email,mobile,birth,password) VALUES(?,?,?,?,?,?)`;
  try {
    const hashpassword = await bcrypt.hash(password, config.saltRounds);
    pool.query(
      sql,
      [firstName, lastName, email, mobile, birth, hashpassword],
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
          user_id: dbUser.user_id,
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

router.get("/profile", (req, res) => {
  const sql = `SELECT firstName, lastName, email,mobile,birth FROM users WHERE user_id = ?`;
  pool.query(sql, [req.headers.user_Id], (error, data) => {
    res.send(result.createResult(error, data));
  });
});

router.put("/update", (req, res) => {
  const { firstName, lastName, email, mobile, birth } = req.body;
  const sql = `UPDATE users SET firstName=?, lastName=?, email=?,mobile=?,birth=? WHERE user_id = ?`;
  pool.query(
    sql,
    [firstName, lastName, email, mobile, birth, req.user_id],
    (error, data) => {
      res.send(result.createResult(error, data));
    }
  );
});

router.put("/updatepassword", async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  try {
    // 1. Get current password from DB
    const sql = `SELECT password FROM users WHERE user_id = ?`;
    pool.query(sql, [req.user_id], async (error, data) => {
      if (error) return res.send(result.createResult(error));

      if (data.length === 0)
        return res.send(result.createResult("User not found"));

      const dbUser = data[0];

      // 2. Compare old password
      const isValid = await bcrypt.compare(oldPassword, dbUser.password);

      if (!isValid)
        return res.send(result.createResult("Incorrect Old Password"));

      // 3. Hash new password
      const hashed = await bcrypt.hash(newPassword, config.saltRounds);

      // 4. Update DB
      const updateSql = `UPDATE users SET password=? WHERE user_id=?`;
      pool.query(updateSql, [hashed, req.user_id], (err, updateResult) => {
        return res.send(result.createResult(err, updateResult));
      });
    });
  } catch (error) {
    res.send(result.createResult(error));
  }
});

module.exports = router;
