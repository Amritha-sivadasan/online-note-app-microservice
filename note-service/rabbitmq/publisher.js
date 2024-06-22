const { connectRabbitMQ } = require("./rabbitmqconnection");

const exchange = "commonexchange";
const PublisherNote = async (queue, data) => {
  try {
    const { channel } = await connectRabbitMQ();
    await channel.assertExchange(exchange, "fanout", { durable: true });
    await channel.assertQueue(queue, { durable: true });
    await channel.bindQueue(queue, exchange, "");
    const message = JSON.stringify(data);
    const publishStatus = channel.publish(exchange, "", Buffer.from(message));
    console.log("Exchange and queue asserted and bound successfully.");
    if (publishStatus) {
      console.log("Message published to queue successfully:", message);
    } else {
      console.error("Failed to publish message to queue:", message);
    }
  } catch (error) {
    console.error("Failed to publish message:", error);
  }
};

module.exports = { PublisherNote };
