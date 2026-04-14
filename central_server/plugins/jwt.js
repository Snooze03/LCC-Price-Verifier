import fastifyPlugin from 'fastify-plugin';
import fastifyJwt from '@fastify/jwt';
import 'dotenv/config';

async function jwtToken(FASTIFY, options) {
    // Access Token
    FASTIFY.register(fastifyJwt, {
        secret: process.env.JWT_SECRET_KEY,
        namespace: 'access',
        sign: { expiresIn: '15' },
    });

    // Refresh Token
    FASTIFY.register(fastifyJwt, {
        secret: process.env.JWT_SECRET_KEY,
        cookie: {
            cookieName: 'refresh_token',
        },
        namespace: 'refresh',
        sign: { expiresIn: '7d' },
    });

    // JWT Authenticator for routes
    FASTIFY.decorate('authenticate', async function (request, reply) {
        try {
            await request.accessJwtVerify();
        } catch (error) {
            FASTIFY.log.error({ err: error }, 'JWT verification failed');
            reply.code(401).send({ message: 'Unauthorized!' });
        }
    });

    FASTIFY.log.info('Plugins: JWT Token Registered');
}

export default fastifyPlugin(jwtToken);
