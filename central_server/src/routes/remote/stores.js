export async function remoteStoreRoutes(FASTIFY, options) {
    FASTIFY.get('/stores', async (request, reply) => {
        try {
            const stores = await FASTIFY.prisma.stores.findMany();
            return stores;
        } catch (error) {
            FASTIFY.log.error(error);
            return error;
        }
    });

    FASTIFY.log.info('Routes: Remote Store Routes Registered');
}
