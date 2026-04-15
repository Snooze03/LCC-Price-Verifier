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
                `SELECT store_id, passWord
                FROM stores
                WHERE store_id = ?`,
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

            // Generate tokens
            const access_token = FASTIFY.jwt.access.sign({ store_id });
            const refresh_token = FASTIFY.jwt.refresh.sign({ store_id });

            // generate cookie with refresh token
            reply.setCookie('refresh_token', refresh_token).send({
                message: 'SUCCESS!',
                body: {
                    access_token,
                },
            });
        },
    );

    FASTIFY.post('/refresh', async (request, reply) => {
        const old_refresh_token = await request.cookies.refresh_token;

        if (!old_refresh_token)
            return reply.code(401).send({ message: 'Refresh Token Missing!' });

        try {
            // verify old refresh token
            const decoded = await request.refreshJwtVerify({
                onlyCookie: true,
            });

            // generate new tokens (token rotation)
            const newAccessToken = FASTIFY.jwt.access.sign({
                store_id: decoded.store_id,
            });
            const newRefreshToken = FASTIFY.jwt.refresh.sign({
                store_id: decoded.store_id,
            });

            // overwrite old cookies with new tokens
            reply.setCookie('refresh_token', newRefreshToken).send({
                message: 'SUCCESS!',
                body: {
                    access_token: newAccessToken,
                },
            });
        } catch (error) {
            FASTIFY.log.error(error);
            return reply.code(401).send({ message: 'Invalid Refresh Token!' });
        }
    });

    FASTIFY.log.info('Routes: Authentication Routes Registered');
}
