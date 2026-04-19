import Fastify from 'fastify';
import 'dotenv/config';
import {
    serializerCompiler,
    validatorCompiler,
} from 'fastify-type-provider-zod';

import dbConnectorFP from './plugins/FP-dbConnector.js';
import corsFP from './plugins/FP-cors.js';
import jwtTokenFP from './plugins/FP-jwt.js';
import cookiesFP from './plugins/FP-cookies.js';
import argonFP from './plugins/FP-argon.js';
import { configRoutes } from './routes/remote/config.js';
import { authRoutes } from './routes/internal/auth.js';
import { storeRoutes } from './routes/internal/stores.js';

const FASTIFY = Fastify({
    logger: {
        transport: {
            target: 'pino-pretty',
        },
    },
});

const start = async () => {
    // Plugins
    await FASTIFY.register(dbConnectorFP);
    // Cors Origins Settings
    await FASTIFY.register(corsFP);
    await FASTIFY.register(jwtTokenFP);
    await FASTIFY.register(cookiesFP);
    await FASTIFY.register(argonFP);

    // zod settings
    FASTIFY.setValidatorCompiler(validatorCompiler);
    FASTIFY.setSerializerCompiler(serializerCompiler);

    // Internal Routes
    FASTIFY.register(authRoutes, { prefix: '/auth' });

    // Remote Routes
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
