const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");
const { allNotes, addNotes, Mynotes } = require("./controller/noteController");
const {connectRabbitMQ}=require('./rabbitmq/rabbitmqconnection')

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());


app.get("/", allNotes);
app.post("/add", addNotes);
app.get("/myNote", Mynotes);


connectRabbitMQ()

mongoose
  .connect(process.env.MONGOURL)
  .then(() => {
    console.log("mongoose is connectd successfully");
  })
  .catch((err) => {
    console.log("database connection error", err);
  });
app.listen(5002, () => {
  console.log("server is running on the port 5002");
});
