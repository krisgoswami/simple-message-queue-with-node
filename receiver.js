import amqp from 'amqplib';

async function receiveMessage() {
    try {
        const connection = await amqp.connect('amqp://localhost'); // Connect to RabbitMQ server
        const channel = await connection.createChannel(); // Create a channel

        const queueName = 'test_queue';

        await channel.assertQueue(queueName, { durable: false }); // Create the queue

        console.log(`Waiting for messages in ${queueName}. To exit press CTRL+C`);

        channel.consume(
            queueName,
            (msg) => {
                const message = msg.content.toString();
                console.log(`Received message: ${message}`);
            },
            { noAck: true } // No acknowledgment, message will be removed from the queue automatically
        );
    } catch (error) {
        console.error(error);
    }
}

receiveMessage();
