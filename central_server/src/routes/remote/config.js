export async function configRoutes(FASTIFY, options) {
    // Route for fetching local store backend server config
    FASTIFY.get(
        '/config',
        {
            onRequest: [FASTIFY.authenticate],
        },
        async (request, reply) => {
            const storeID = request.user.store_id;

            const rawConfigData = await FASTIFY.prisma.config.findFirst({
                where: { store_id: storeID },
            });

            const { id, store_id, ...configData } = rawConfigData;

            return configData;
        },
    );

    FASTIFY.log.info('Routes: Configuration Routes Registered');
}
