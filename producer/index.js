const express = require("express");
const amqp = require("amqplib");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

const queue = "hello";

app.post("/", async (req, res) => {
  let connection;

  const { text } = JSON.parse(req.body);

  try {
    connection = await amqp.connect("amqp://localhost");
    const channel = await connection.createChannel();

    await channel.assertQueue(queue, { durable: false });

    channel.sendToQueue(queue, Buffer.from(text));
    console.log(" [x] Sent '%s'", text);
    await channel.close();
  } catch (err) {
    console.warn(err);
  } finally {
    if (connection) await connection.close();
  }
  res.send({ message: "event received." });
});
