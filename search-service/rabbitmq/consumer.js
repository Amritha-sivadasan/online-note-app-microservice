const { connectRabbitMQ } = require("./rabbitmqConnections");
const Note=require('../model/noteModel')

const consumer = async () => {
    try {
        const { channel } = await connectRabbitMQ();

  const queue = "Note_Creted";
  await channel.assertQueue(queue, { durable: true });
  console.log("consumer is listening");
  channel.consume(queue, async (msg) => {
    try {
      if (msg !== null) {
        console.log("Message Received:", msg.content.toString());
        const msgContent = msg.content.toString();
        const data = JSON.parse(msgContent);
     
        const { noteId,title,userId,content,tags } = data;
        const noteDetails = new Note({noteId,title,userId,content,tags})
        noteDetails.save()
       
        channel.ack(msg);
      }
    } catch (error) {
      console.error("Error processing message:", error);
    }
  });

  console.log("Consumer started successfully.");
        
    } catch (error) {
        
        console.log('error occur in consumer rabbit mq');
    }
  
};


module.exports={consumer}