import 'dotenv/config';
import fastifyPlugin from 'fastify-plugin';
import { PrismaMariaDb } from '@prisma/adapter-mariadb';
import { PrismaClient } from '#generated/prisma/client';

async function prismaClientFP(FASTIFY, options) {
    const adapter = new PrismaMariaDb({
        host: process.env.DATABASE_HOST,
        user: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_NAME,
        connectionLimit: 5,
    });

    const prisma = new PrismaClient({ adapter });

    // timeout promise
    const timeout = new Promise((_, reject) =>
        setTimeout(
            () => reject(new Error('Prisma connection timeout after 5s')),
            5000,
        ),
    );

    try {
        // Race the connection against the timeout
        await Promise.race([prisma.$connect(), timeout]);
        FASTIFY.log.info('Plugins: Prisma ORM Registered');
    } catch (error) {
        FASTIFY.log.error(`Database Connection Failed: ${error.message}`);

        await FASTIFY.close();
        process.exit(1);
    }

    FASTIFY.decorate('prisma', prisma);

    FASTIFY.addHook('onClose', async (instance) => {
        await instance.prisma.$disconnect();
    });
}

export default fastifyPlugin(prismaClientFP);
