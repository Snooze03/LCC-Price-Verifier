import { writeFile } from 'node:fs/promises';
import fastify from 'fastify';
import fastifyCors from '@fastify/cors';

import { api } from '#api/api';
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
    await FASTIFY.register(fastifyCors, {
        // Allow all
        // IMPORTANT NOTE: change to specific ip's on prod
        origin: '*',
        methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization'],
    });
    // Authenticate local server
    // await consoleLogin();

    // try {
    //     const response = await api.get('pricever/config');
    //     FASTIFY.log.info(response.message);
    //     const config = JSON.stringify(response.data, null, 4);

    //     await writeFile('./config.json', config, 'utf8');
    //     FASTIFY.log.info('Config: Updated config file');
    // } catch (error) {
    //     FASTIFY.log.error(error);
    // }

    // Plugins
    // await FASTIFY.register(dbConnectorFP);
    await FASTIFY.register(fastifyStaticFP);

    // Routes
    FASTIFY.register(priceRoutes);

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
