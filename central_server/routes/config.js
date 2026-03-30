export async function configRoutes(FASTIFY, options) {
    // Route for fetching local store backend server config (db connection string, user name, etc...)
    FASTIFY.get('/config/backend/:store_id', async (request, reply) => {
        const { store_id } = request.params;

        const [rows] = await FASTIFY.mysql.query(
            `SELECT config.store_id, config.db_connection_string, config.db_user_name
            FROM config
            INNER JOIN stores 
            ON stores.store_id = config.store_id
            WHERE config.store_id = ?`,
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
        };
    });
}
