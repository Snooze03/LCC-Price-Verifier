import fastifyPlugin from 'fastify-plugin';
import fastifyMysql from '@fastify/mysql';
import chalk from 'chalk';

async function dbConnectorFP(FASTIFY, options) {
    const { connection_type, db_user, db_password, host, port, db_name } =
        FASTIFY.config;

    const connectionString = `${connection_type}://${db_user}:${db_password}@${host}:${port}/${db_name}`;
    console.info(chalk.green('DB Connection String:'), connectionString);

    try {
        await FASTIFY.register(fastifyMysql, {
            promise: true,
            connectionString: connectionString.toString(),
        });

        FASTIFY.log.info('Plugins: Database connector registered');
    } catch (error) {
        FASTIFY.log.error({
            msg: 'Database Connection Error',
            code: error.code,
            err: {
                message: error.message,
                stack: error.stack,
                errno: error.errno,
                sqlState: error.sqlState,
            },
            context: {
                user: db_user,
                host: host,
                port: port,
                database: db_name,
                usingPassword: Boolean(db_password),
            },
        });

        process.exit(1);
    }
}

export default fastifyPlugin(dbConnectorFP);
