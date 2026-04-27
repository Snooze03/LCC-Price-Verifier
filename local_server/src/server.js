import fastify from 'fastify';

import corsFP from '#plugins/FP-cors';
import configFP from '#plugins/FP-config';
import dbConnectorFP from '#plugins/FP-dbConnector';
import fastifyStaticFP from '#plugins/FP-static';
import { consoleLogin } from '#plugins/consoleLogin';
import { priceRoutes } from '#routes/price';

const FASTIFY = fastify({
    logger: {
        transport: {
            target: 'pino-pretty',
        },
    },
});

const start = async () => {
    // Authenticate local server
    await consoleLogin();

    // Plugins
    await FASTIFY.register(corsFP);
    await FASTIFY.register(configFP);
    await FASTIFY.register(dbConnectorFP);
    await FASTIFY.register(fastifyStaticFP);

    // Routes
    FASTIFY.register(priceRoutes);

    await FASTIFY.listen({ port: 3002, host: '0.0.0.0' });
};

// graceful shutdown
['SIGINT', 'SIGTERM'].forEach((signal) => {
    process.on(signal, async () => {
        await FASTIFY.close();

        process.exit(0);
    });
});

start();
