import { writeFile } from 'node:fs/promises';
import fastify from 'fastify';

import { consoleLogin } from '#plugins/consoleLogin';
import dbConnectorFP from '#plugins/FP-dbConnector';
import { priceRoutes } from '#routes/local';
import { api } from '#api/api';

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

    try {
        const response = await api.get('pricever/config');
        const config = JSON.stringify(response.data, null, 4);

        await writeFile('./config.json', config, 'utf8');
        FASTIFY.log.info('Config: Updated config file');
    } catch (error) {
        console.log(error);
    }

    await FASTIFY.register(dbConnectorFP);
    await FASTIFY.register(priceRoutes, { prefix: 'price' });

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
