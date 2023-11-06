import amqp from 'amqplib';

async function sendMessage() {
    try {
        const connection = await amqp.connect('amqp://localhost'); // Connect to RabbitMQ server
        const channel = await connection.createChannel(); // Create a channel

        const queueName = 'test_queue';
        const message = 'this is a short message queue assignment for OrangePe Solutions';

        await channel.assertQueue(queueName, { durable: false }); // Create the queue

        channel.sendToQueue(queueName, Buffer.from(message)); // Send a message to the queue

        console.log(`Sent message: ${message}`);

        setTimeout(() => {
            connection.close();
            process.exit(0);
        }, 500);
    } catch (error) {
        console.error(error);
    }
}

sendMessage();
