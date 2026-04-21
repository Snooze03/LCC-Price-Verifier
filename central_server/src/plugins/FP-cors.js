import fastifyPlugin from 'fastify-plugin';
import fastifyCors from '@fastify/cors';

async function corsFP(FASTIFY, options) {
    FASTIFY.register(fastifyCors, {
        // Allow all
        // IMPORTANT NOTE: change to specific ip's on prod
        origin: '*',
    });
}

export default fastifyPlugin(corsFP);
