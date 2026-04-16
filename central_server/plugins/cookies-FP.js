import cookie from '@fastify/cookie';
import fastifyPlugin from 'fastify-plugin';
import 'dotenv/config';

async function cookies(FASTIFY, options) {
    FASTIFY.register(cookie, {
        secret: process.env.COOKIE_SECRET_KEY,
        path: '/',
        httpOnly: true,
        secure: false,
        sameSite: 'lax',
    });
}

export default fastifyPlugin(cookies);
