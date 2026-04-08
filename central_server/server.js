import Fastify from 'fastify';
import 'dotenv/config';
import {
    serializerCompiler,
    validatorCompiler,
} from 'fastify-type-provider-zod';

import dbConnector from './plugins/dbConnector.js';
import jwtToken from './plugins/jwt.js';
import { configRoutes } from './routes/config.js';
import { authRoutes } from './routes/auth.js';

const FASTIFY = Fastify({
    logger: {
        transport: {
            target: 'pino-pretty',
        },
    },
});

const start = async () => {
    // zod settings
    FASTIFY.setValidatorCompiler(validatorCompiler);
    FASTIFY.setSerializerCompiler(serializerCompiler);

    // Plugins
    await FASTIFY.register(dbConnector);
    await FASTIFY.register(jwtToken);

    // Routes
    FASTIFY.register(configRoutes, { prefix: '/config' });
    FASTIFY.register(authRoutes, { prefix: '/auth' });

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
