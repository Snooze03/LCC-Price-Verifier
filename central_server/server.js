import Fastify from 'fastify';
import 'dotenv/config';
import {
    serializerCompiler,
    validatorCompiler,
} from 'fastify-type-provider-zod';

import dbConnector from './plugins/FP-dbConnector.js';
import jwtToken from './plugins/FP-jwt.js';
import cookies from './plugins/FP-cookies.js';
import argonFP from './plugins/FP-argon.js';
import { configRoutes } from './routes/pricever/config.js';
import { authRoutes } from './routes/local/auth.js';
import { storeRoutes } from './routes/local/stores.js';

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
    await FASTIFY.register(cookies);
    await FASTIFY.register(argonFP);

    // Public Routes
    FASTIFY.register(authRoutes, { prefix: '/auth' });

    // Protected Routes
    FASTIFY.register(configRoutes, { prefix: '/pricever/server' });
    FASTIFY.register(storeRoutes, { prefix: '/stores' });

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
