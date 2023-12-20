const express = require("express");
const dotenv = require("dotenv");
dotenv.config();

const connectDB = require("./config/db");

const todolistRouter = require("./routes/todolistRoutes");

connectDB();
const app = express();

//Parse body
app.use(express.json());
//Allow to send form data
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("API running on express");
});

app.use("/api/todolist", todolistRouter);

app.listen(5000, () => {
  console.log("Running on port 5000");
});

module.exports = app;
