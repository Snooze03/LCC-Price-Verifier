import fastify from 'fastify';
import dbConnector from './plugins/dbConnector.js';
import { configRoutes } from './routes/config.js';

const FASTIFY = fastify({ logger: true });

const start = async () => {
    try {
        await FASTIFY.register(dbConnector);
        await FASTIFY.register(configRoutes);

        await FASTIFY.listen({ port: 3000, host: '0.0.0.0' });
        console.log('Server is running on port 3000');
    } catch (err) {
        FASTIFY.log.error(err);
        process.exit(1);
    }
};

start();
