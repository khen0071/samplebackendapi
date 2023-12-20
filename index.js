const express = require("express");
const dotenv = require("dotenv");
dotenv.config();

const connectDB = require("./config/db");

connectDB();

const app = express();

app.get("/", (req, res) => {
  res.send("API running on express");
});

app.listen(5000, () => {
  console.log("Running on port 5000");
});

module.exports = app;
