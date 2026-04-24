import { readFile } from 'node:fs/promises';
import fastifyPlugin from 'fastify-plugin';
import fastifyMysql from '@fastify/mysql';
import 'dotenv/config';

async function dbConnectorFP(FASTIFY, options) {
    const rawFile = await readFile('../config.json', 'utf8');
    const config = JSON.parse(rawFile);
    const connectionString =
        config.db_connection_string +
        config.db_user_name +
        ':' +
        config.db_password +
        '/price_ver';
    // mysql://pricever:pricever@10.0.3.46:3306/price_ver
    console.log(connectionString);
    // FASTIFY.register(fastifyMysql, {
    //     promise: true,
    //     connectionString: process.env.DB_CONNECTION_STRING,
    // });
}

export default fastifyPlugin(dbConnectorFP);
