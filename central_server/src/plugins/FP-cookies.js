import cookie from '@fastify/cookie';
import fastifyPlugin from 'fastify-plugin';
import 'dotenv/config';

async function cookiesFP(FASTIFY, options) {
    FASTIFY.register(cookie, {
        secret: process.env.COOKIE_SECRET_KEY,
        path: '/',
        httpOnly: true,
        secure: false,
        sameSite: 'lax',
    });

    FASTIFY.log.info('Plugins: Cookies Registered');
}

export default fastifyPlugin(cookiesFP);
