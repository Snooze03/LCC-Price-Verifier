import { writeFile } from 'node:fs/promises';
import fastify from 'fastify';

import { consoleLogin } from './plugins/consoleLogin.js';
import dbConnectorFP from './plugins/FP-dbConnector.js';
import { priceRoutes } from './routes/local.js';
import { api } from './api/api.js';

const FASTIFY = fastify({
    logger: {
        transport: {
            target: 'pino-pretty',
        },
    },
});

// Local Server Flow
// [x] Fetch config from CENTRAL DB
// [ ] Configure local server with fetched config
// [ ] Register routes
const start = async () => {
    // Authenticate local server
    await consoleLogin();

    try {
        const response = await api.get('pricever/config');
        const config = JSON.stringify(response.data, null, 4);

        await writeFile('./config.json', config, 'utf8');
        console.log('Config Saved!');
    } catch (error) {
        console.log(error);
    }

    // await FASTIFY.register(dbConnectorFP);
    // await FASTIFY.register(priceRoutes);

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
