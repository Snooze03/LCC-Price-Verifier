import { authSchema } from '../schema/auth.js';

export async function authRoutes(FASTIFY, options) {
    FASTIFY.post(
        '/login',
        {
            schema: authSchema,
        },
        async (request, reply) => {
            const [rows] = await FASTIFY.mysql.query(
                `SELECT id, passWord
                FROM stores
                WHERE id = ?`,
                [request.body.store_id],
            );

            // Checks if store exists
            if (rows.length === 0) {
                return reply.code(404).send({
                    message: 'Store Not Found',
                });
            }

            // Get object
            const store = rows[0];

            // Check if password matches
            if (store.passWord !== request.body.password) {
                return reply.code(401).send({
                    message: 'Authentication Failed',
                });
            }

            // Generate JWT token

            return {
                message: 'SUCCESS!',
                body: {
                    result: rows,
                },
            };
        },
    );

    FASTIFY.log.info('Routes: Authentication Routes Registered');
}
