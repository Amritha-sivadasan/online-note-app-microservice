const { connectRabbitMQ } = require("./rabbitmqconnection");
const {sendNotification} = require("../utils/notificationSender");
const axios = require("axios");

const consumer = async () => {
  try {
    const { channel } = await connectRabbitMQ();

    const queue = "Notification";
    await channel.assertQueue(queue, { durable: true });
    console.log("consumer is listening");
    channel.consume(queue, async (msg) => {
      try {
        if (msg !== null) {
          console.log("Message Received:", msg.content.toString());
          const msgContent = msg.content.toString();
          const data = JSON.parse(msgContent);
          const { userId, title } = data;
          console.log(userId);

          const userServiceUrl = `http://localhost:5001/user?userId=${userId}`;
          const userResponse = await axios.get(userServiceUrl);
       

          if (userResponse.data) {
            const { email } = userResponse.data;
            console.log(`User Email: ${email}`);
            const subject = "New Note Created";
            const message = `A new note has been created: ${title}`;
            sendNotification(email, subject, message);
          } else {
            console.error(`User with ID ${userId} not found.`);
          }

          channel.ack(msg);
        }
      } catch (error) {
        console.error("Error processing message:", error);
      }
    });

    console.log("Consumer started successfully.");
  } catch (error) {
    console.log("error occur in consumer rabbit mq");
  }
};

module.exports = { consumer };
