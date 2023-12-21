const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");

const connectDB = require("./config/db");

const todolistRouter = require("./routes/todolistRoutes");

connectDB();
const app = express();

app.use(
  cors({
    origin: "*",
  })
);

//Parse body
app.use(express.json());
//Allow to send form data
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("API running on express");
});

app.use("/api/todolist", todolistRouter);

app.listen(8000, () => {
  console.log("Running on port 8000");
});

module.exports = app;
