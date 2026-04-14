import fastifyPlugin from 'fastify-plugin';
import fastifyJwt from '@fastify/jwt';
import 'dotenv/config';

async function jwtToken(FASTIFY, options) {
    FASTIFY.register(fastifyJwt, {
        secret: process.env.JWT_SECRET_KEY,
    });

    FASTIFY.decorate('jwtAuthenticate', async function (request, reply) {
        try {
            await request.jwtVerify();
        } catch (error) {
            FASTIFY.log.error({ err: error }, 'JWT verification failed');
            reply.code(401).send({ message: 'Unauthorized!' });
            return;
        }
    });

    FASTIFY.log.info('Plugins: JWT Token Registered');
}

export default fastifyPlugin(jwtToken);
