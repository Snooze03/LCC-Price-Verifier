export async function configRoutes(FASTIFY, options) {
    // Route for fetching local store backend server config
    // (db connection string, user name, etc...)
    FASTIFY.get(
        '/config',
        {
            onRequest: [FASTIFY.authenticate],
        },
        async (request, reply) => {
            const { store_id } = request.user;

            const [rows] = await FASTIFY.mysql.query(
                `SELECT store_id, db_connection_string, db_user_name, db_password, image_path
                FROM config
                WHERE store_id = ?`,
                [store_id],
            );

            if (!rows || rows.length === 0) {
                return reply.code(404).send({
                    error: 'Not Found',
                    message: `No store config found with id: ${store_id}`,
                });
            }

            const item = rows[0];

            return {
                store_id: item.store_id,
                db_connection_string: item.db_connection_string,
                db_user_name: item.db_user_name,
                db_password: item.db_password,
                image_path: item.image_path,
            };
        },
    );

    FASTIFY.log.info('Routes: Configuration Routes Registered');
}
