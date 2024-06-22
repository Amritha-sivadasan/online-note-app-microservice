const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const {connectRabbitMQ}=require('./rabbitmq/rabbitmqconnection')
const {consumer}=require('./rabbitmq/notificationConsumer')

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());


connectRabbitMQ().then(()=>{
    consumer()
})

app.listen(5003, () => {
  console.log("server is running on the port 5003");
});
