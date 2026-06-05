const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.send("VK Connect Backend Running");
});

app.listen(3000, () => {
  console.log("Server Started");
});
