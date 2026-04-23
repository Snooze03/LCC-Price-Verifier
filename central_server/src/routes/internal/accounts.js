export async function accountRoutes(FASTIFY, options) {
    FASTIFY.post(
        '/',
        {
            // schema: authSchema,
        },
        async (request, reply) => {
            const { email, password, role } = request.body;
            const hashedPassword = await FASTIFY.hash(password);

            try {
                await FASTIFY.prisma.accounts.create({
                    data: {
                        email,
                        password: hashedPassword,
                        role,
                    },
                });

                return reply.code(200).send({
                    message: 'Account Created successfully',
                });
            } catch (error) {
                return error;
            }
        },
    );

    FASTIFY.get(
        '/',
        {
            // schema: authSchema,
        },
        async (request, reply) => {
            try {
                const accounts = await FASTIFY.prisma.accounts.findMany();
                return accounts;
            } catch (error) {
                return error;
            }
        },
    );

    FASTIFY.patch(
        '/',
        {
            // schema: authSchema,
        },
        async (request, reply) => {
            const { id, email, password, role } = request.body;
            const hashedPassword = await FASTIFY.hash(password);

            try {
                await FASTIFY.prisma.accounts.update({
                    where: { id },
                    data: {
                        email,
                        password: hashedPassword,
                        role,
                    },
                });

                return reply.code(200).send({
                    message: 'Account Updated successfully',
                });
            } catch (error) {
                return error;
            }
        },
    );

    FASTIFY.delete(
        '/:accountID',
        {
            // schema: authSchema,
        },
        async (request, reply) => {
            const { accountID } = request.params;

            try {
                await FASTIFY.prisma.accounts.delete({
                    where: { id: Number(accountID) },
                });

                return reply.code(200).send({
                    message: 'Account Deleted successfully',
                });
            } catch (error) {
                return error;
            }
        },
    );

    FASTIFY.log.info('Routes: Account Routes Registered');
}
