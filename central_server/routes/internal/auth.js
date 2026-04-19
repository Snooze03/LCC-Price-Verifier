import { authSchema } from '../../schema/auth.js';

export async function authRoutes(FASTIFY, options) {
    FASTIFY.post(
        '/login',
        {
            // schema: authSchema,
        },
        async (request, reply) => {
            const email = request.body.email;
            const password = request.body.password;

            const [rows] = await FASTIFY.mysql.query(
                `SELECT email, password
                FROM accounts
                WHERE email = ?`,
                [email],
            );

            // Checks if store exists
            if (rows.length === 0) {
                return reply.code(404).send({
                    message: 'Account Not Found',
                });
            }

            // Get object
            const account = rows[0];
            // Check if password matches
            // const isCorrect = await FASTIFY.verify(email.password, password);

            const isCorrect = password === account.password;
            if (isCorrect) {
                // Generate tokens
                const access_token = FASTIFY.jwt.access.sign({ email });
                const refresh_token = FASTIFY.jwt.refresh.sign({ email });

                // generate cookie with refresh token
                reply.setCookie('refresh_token', refresh_token).send({
                    message: 'SUCCESS!',
                    body: {
                        access_token: access_token,
                    },
                });
            } else {
                return reply.code(401).send({
                    message: 'Incorrect Password',
                });
            }
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
                email: decoded.email,
            });
            const newRefreshToken = FASTIFY.jwt.refresh.sign({
                email: decoded.email,
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
