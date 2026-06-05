const express = require("express");
const router = express.Router();

router.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (
    username === "admin" &&
    password === "VKWorld@2026"
  ) {
    return res.json({
      success: true,
      message: "Admin Login Success"
    });
  }

  res.status(401).json({
    success: false,
    message: "Wrong Username or Password"
  });
});

module.exports = router;
