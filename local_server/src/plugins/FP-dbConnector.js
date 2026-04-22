import 'dotenv/config';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import fastifyPlugin from 'fastify-plugin';
import fastifyMysql from '@fastify/mysql';

async function dbConnectorFP(FASTIFY, options) {
    const rootDir = process.cwd();
    const configPath = path.join(rootDir, 'config.json');

    const rawData = await readFile(configPath, 'utf8');
    const { connection_type, db_user, db_password, host, port, db_name } =
        JSON.parse(rawData);

    const connectionString =
        connection_type +
        '://' +
        db_user +
        ':' +
        db_password +
        '@' +
        host +
        ':' +
        port +
        '/' +
        db_name;

    // console.log(connectionString);

    // mysql://pricever:pricever@10.0.3.46:3306/price_ver
    FASTIFY.register(fastifyMysql, {
        promise: true,
        connectionString: connectionString.toString(),
    });

    FASTIFY.log.info('Plugins: Database connector registered');
}

export default fastifyPlugin(dbConnectorFP);
