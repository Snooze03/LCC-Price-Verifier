import Fastify from 'fastify';
import 'dotenv/config';
import {
    serializerCompiler,
    validatorCompiler,
} from 'fastify-type-provider-zod';

import dbConnector from './plugins/dbConnector.js';
import jwtToken from './plugins/jwt.js';
import cookies from './plugins/cookies.js';
import argonFP from './plugins/argonFP.js';
import { configRoutes } from './routes/config.js';
import { authRoutes } from './routes/auth.js';
import { storeRoutes } from './routes/stores.js';

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
    FASTIFY.register(configRoutes, { prefix: '/config' });
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
