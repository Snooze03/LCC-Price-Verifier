import fastify from 'fastify';
import { consoleLogin } from './plugins/consoleLogin.js';
import dbConnector from './plugins/dbConnector.js';
import { priceRoutes } from './routes/local.js';

const FASTIFY = fastify({
    logger: {
        transport: {
            target: 'pino-pretty',
        },
    },
});

// Local Server Flow
// 1. Fetch config from CENTRAL DB
// 2. Configure local server with fetched config
// 3. Register routes
const start = async () => {
    // Authenticate local server
    const remoteToken = await consoleLogin();
    // console.log(remoteToken);

    await FASTIFY.register(dbConnector);
    await FASTIFY.register(priceRoutes);

    await FASTIFY.listen({ port: 3000, host: '0.0.0.0' });
};

// graceful shutdown
['SIGINT', 'SIGTERM'].forEach((signal) => {
    process.on(signal, async () => {
        await FASTIFY.close();

        process.exit(0);
    });
});

start();
