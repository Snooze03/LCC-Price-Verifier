import fastifyPlugin from 'fastify-plugin';
import fastifyJwt from '@fastify/jwt';
import 'dotenv/config';

async function jwtToken(FASTIFY, options) {
    FASTIFY.register(fastifyJwt, {
        secret: process.env.JWT_SECRET_KEY,
    });

    FASTIFY.log.info('Plugins: JWT Token Registered');
}

export default fastifyPlugin(jwtToken);
