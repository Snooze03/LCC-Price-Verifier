import { authSchema } from '../schema/auth.js';

export async function authRoutes(FASTIFY, options) {
    FASTIFY.post(
        '/login',
        {
            schema: authSchema,
        },
        async (request, reply) => {
            const store_id = request.body.store_id;
            const password = request.body.password;

            const [rows] = await FASTIFY.mysql.query(
                `SELECT id, passWord
                FROM stores
                WHERE id = ?`,
                [store_id],
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
            // IMPORTANT NOTE: Add password hashing later on
            if (store.passWord !== password) {
                return reply.code(401).send({
                    message: 'Incorrect Password',
                });
            }

            // Generate JWT token
            const access_token = FASTIFY.jwt.sign({
                payload: {
                    store_id,
                },
            });

            return {
                message: 'SUCCESS!',
                body: {
                    access_token,
                },
            };
        },
    );

    FASTIFY.log.info('Routes: Authentication Routes Registered');
}
