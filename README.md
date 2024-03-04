# async-communication-example

An example of asynchronous communication with a message broker ( RabbitMQ ) between 2 docker containers.

1. Run docker compose

```bash
docker-compose up -d
```

2. Restart consumer
   Very often the consumer starts BEFORE the rabbitmq service is properly up and running. You need to restart the consumer for it to connect properly to the broker.

```bash
docker restart consumer
```

3. Connect a http-client ( Postman?) to `http://localhost:3002` and post messages in the following JSON form.

```json
{
  "text": "Your awesome message"
}
```
