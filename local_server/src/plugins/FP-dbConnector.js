import fastifyPlugin from 'fastify-plugin';
import fastifyMysql from '@fastify/mysql';

async function dbConnectorFP(FASTIFY, options) {
    const { connection_type, db_user, db_password, host, port, db_name } =
        FASTIFY.config;

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

    FASTIFY.register(fastifyMysql, {
        promise: true,
        connectionString: connectionString.toString(),
    });

    FASTIFY.log.info('Plugins: Database connector registered');
}

export default fastifyPlugin(dbConnectorFP);
