import fastify from 'fastify';
import {
    serializerCompiler,
    validatorCompiler,
} from 'fastify-type-provider-zod';
import dbConnector from './plugins/dbConnector.js';
import { configRoutes } from './routes/config.js';
import { authRoutes } from './routes/auth.js';

const FASTIFY = fastify({
    logger: {
        transport: {
            target: 'pino-pretty',
        },
    },
});

// Set fastify zod settings
FASTIFY.setValidatorCompiler(validatorCompiler);
FASTIFY.setSerializerCompiler(serializerCompiler);

const start = async () => {
    // Register Plugins
    await FASTIFY.register(dbConnector);

    // Register Routes
    await FASTIFY.register(configRoutes);
    await FASTIFY.register(authRoutes);

    await FASTIFY.listen({ port: 3001, host: '0.0.0.0' });
};

// graceful shutdown
['SIGINT', 'SIGTERM'].forEach((signal) => {
    process.on(signal, async () => {
        await FASTIFY.close();

        process.exit(0);
    });
});

start();
