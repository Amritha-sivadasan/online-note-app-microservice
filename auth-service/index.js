const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const { register, login } = require("./controller/userController");
const app = express();
dotenv.config();


app.use(cookieParser());
app.use(cors());
app.use(express.json());
app.get("/", (req, res) => {
  res.json("helloe");
});
app.post("/register", register);
app.post("/", login);

mongoose
  .connect(process.env.MONGOURL)
  .then(() => {
    console.log("database is connected");
  })
  .catch((err) => {
    console.log("error occur in db connection", err);
  });

app.listen(5001, () => {
  console.log("server running on port 5001");
});
