import Fastify from 'fastify';
import 'dotenv/config';
import {
    serializerCompiler,
    validatorCompiler,
} from 'fastify-type-provider-zod';

import prismaClientFP from '#plugins/FP-prisma';
import corsFP from '#plugins/FP-cors';
import jwtTokenFP from '#plugins/FP-jwt';
import cookiesFP from '#plugins/FP-cookies';
import argonFP from '#plugins/FP-argon';
import { configRoutes } from '#routes/remote/config';
import { authRoutes } from '#routes/internal/auth';
import { storeRoutes } from '#routes/internal/stores';
import { remoteAuth } from '#routes/remote/auth';

const FASTIFY = Fastify({
    logger: {
        transport: {
            target: 'pino-pretty',
        },
    },
});

const start = async () => {
    // Plugins
    await FASTIFY.register(prismaClientFP);
    await FASTIFY.register(corsFP);
    await FASTIFY.register(jwtTokenFP);
    await FASTIFY.register(cookiesFP);
    await FASTIFY.register(argonFP);

    // zod settings
    FASTIFY.setValidatorCompiler(validatorCompiler);
    FASTIFY.setSerializerCompiler(serializerCompiler);

    // Internal PUBLIC Routes
    FASTIFY.register(authRoutes, { prefix: '/auth' });
    // Internal PRIVATE Routes
    FASTIFY.register(storeRoutes, { prefix: '/stores' });

    // Remote Routes
    FASTIFY.register(
        async (instance) => {
            // Public Routes
            instance.register(remoteAuth);

            // Private Routes
            instance.register(configRoutes);
        },
        { prefix: '/pricever' },
    );

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
