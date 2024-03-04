const express = require("express");
const amqp = require("amqplib");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

const queue = process.env.QUEUE;

app.post("/", async (req, res) => {
  let connection;

  try {
    const { text } = req.body;
    connection = await amqp.connect(process.env.RABBITMQ_HOST);
    const channel = await connection.createChannel();

    await channel.assertQueue(queue, { durable: false });

    channel.sendToQueue(queue, Buffer.from(text));
    console.log(" [x] Sent '%s'", text);
    await channel.close();
  } catch (err) {
  } finally {
    if (connection) await connection.close();
    res.send({ message: "event received." });
  }
});

app.listen(PORT, () => {
  console.log("Producer up n running.");
});
