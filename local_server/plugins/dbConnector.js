import fastifyPlugin from 'fastify-plugin';
import fastifyMysql from '@fastify/mysql';
import 'dotenv/config';

async function dbConnector(FASTIFY, options) {
    FASTIFY.register(fastifyMysql, {
        promise: true,
        connectionString: process.env.DB_CONNECTION_STRING,
    });
}

export default fastifyPlugin(dbConnector);
