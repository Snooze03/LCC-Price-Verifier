import fastifyPlugin from 'fastify-plugin';
import * as argon2 from 'argon2';
import 'dotenv/config';

async function argonFP(FASTIFY, options) {
    const pepper = Buffer.from(process.env.ARGON_PEPPER);

    FASTIFY.decorate('hash', async function (inputPassword) {
        const hashedPassword = await argon2.hash(inputPassword, {
            secret: pepper,
        });

        return hashedPassword;
    });

    FASTIFY.decorate('verify', async function (hashedPassword, inputPassword) {
        const isCorrect = await argon2.verify(hashedPassword, inputPassword, {
            secret: pepper,
        });

        return isCorrect;
    });
}

export default fastifyPlugin(argonFP);
