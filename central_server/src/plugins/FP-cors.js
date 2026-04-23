import fastifyPlugin from 'fastify-plugin';
import fastifyCors from '@fastify/cors';

async function corsFP(FASTIFY, options) {
    FASTIFY.register(fastifyCors, {
        // Allow all
        // IMPORTANT NOTE: change to specific ip's on prod
        origin: '*',
        methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization'],
    });
}

export default fastifyPlugin(corsFP);
