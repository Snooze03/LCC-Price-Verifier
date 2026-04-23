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

    try {
        // FASTIFY.log.info('Prisma Connecting...');
        await prisma.$connect();
    } catch (error) {
        // FASTIFY.log.error('Prisma Error...');
        FASTIFY.log.error(error);
        throw error;
    }

    // add prisma to fastify instance
    FASTIFY.decorate('prisma', prisma);

    FASTIFY.addHook('onClose', async (instance) => {
        await instance.prisma.$disconnect();
    });

    FASTIFY.log.info('Plugins: Prisma ORM Registered');
}

export default fastifyPlugin(prismaClientFP);
