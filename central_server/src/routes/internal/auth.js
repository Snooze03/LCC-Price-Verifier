import { authSchema } from '#schema/auth';

export async function authRoutes(FASTIFY, options) {
    FASTIFY.post(
        '/login',
        {
            // schema: authSchema,
        },
        async (request, reply) => {
            const { email, password } = request.body;

            // Check if account exists
            const account = await FASTIFY.prisma.accounts.findUnique({
                where: { email },
            });

            if (account) {
                // Check if password matches
                const isCorrect = await FASTIFY.verify(
                    account.password,
                    password,
                );

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
            } else {
                return reply.code(404).send({
                    message: `Could not find account with email: ${email}`,
                });
            }
        },
    );

    FASTIFY.post(
        '/signup',
        {
            // schema: authSchema,
        },
        async (request, reply) => {
            const { email, password, role } = request.body;
            const hashedPassword = await FASTIFY.hash(password);

            const newAccount = await FASTIFY.prisma.accounts.create({
                data: {
                    email,
                    password: hashedPassword,
                    role,
                },
            });

            if (newAccount) {
                return reply.code(200).send({
                    message: 'New account created successfully',
                });
            } else {
                return newAccount;
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
