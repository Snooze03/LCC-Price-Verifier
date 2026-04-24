import fastifyCors from '@fastify/cors';
import fastifyPlugin from 'fastify-plugin';

async function corsFP(FASTIFY, options) {
    FASTIFY.register(fastifyCors, {
        // IMPORTANT NOTE: change to specific ip's on prod
        origin: '*', // Allow all
        methods: ['GET'],
        allowedHeaders: ['Content-Type', 'Authorization'],
    });

    FASTIFY.log.info('Plugins: Cors Registered');
}

export default fastifyPlugin(corsFP);
