import { includes } from 'zod';

export async function storeRoutes(FASTIFY, options) {
    // ================ IMPORTANT NOTE =================
    // To add:
    // 1. Schemas
    // 2. Error handlers
    // 3. Pagination

    // ========== EVENT LISTENERS ==========
    // FASTIFY.addHook('onRequest', async (request, reply) => {
    //     try {
    //         await FASTIFY.authenticate(request, reply);
    //     } catch (error) {
    //         reply.send(error);
    //     }
    // });
    // ========== END EVENT LISTENERS ==========

    // ========== ROUTES ==========
    // Create new Store Accounts with Config
    FASTIFY.post('/', async (request, reply) => {
        const { store_id, password, location, ...configData } = request.body;
        const hashedPassword = await FASTIFY.hash(password);

        try {
            // Transaction operation
            const result = await FASTIFY.prisma.$transaction(async (tx) => {
                await tx.stores.create({
                    data: {
                        store_id,
                        password: hashedPassword,
                        location,
                    },
                });

                await tx.config.create({
                    data: {
                        store_id,
                        ...configData,
                    },
                });

                return reply.code(200).send({
                    message: 'Successfully created Store with Config',
                });
            });

            return result;
        } catch (error) {
            return error;
        }
    });

    // Fetch Stores with their Corresponding Configs
    FASTIFY.get('/', async (request, reply) => {
        try {
            const stores = await FASTIFY.prisma.stores.findMany({
                include: { config: true },
            });
            return stores;
        } catch (error) {
            return error;
        }
    });

    // Update Stores
    FASTIFY.patch('/', async (request, reply) => {
        const { id, store_id, password, location, ...rawConfigData } =
            request.body;
        // Destructure config array to get object
        const config = rawConfigData.config[0];
        const hashedPassword = await FASTIFY.hash(password);

        try {
            // Transaction operation
            const result = await FASTIFY.prisma.$transaction(async (tx) => {
                await tx.stores.update({
                    where: { id },
                    data: {
                        store_id,
                        password: hashedPassword,
                        location,
                    },
                });

                await tx.config.update({
                    where: { id: config.id },
                    data: {
                        ...config,
                    },
                });

                return reply.code(200).send({
                    message: 'Successfully updated Store',
                });
            });

            return result;
        } catch (error) {
            FASTIFY.log.error(error);
            return error;
        }
    });

    // Delete Store Accounts
    FASTIFY.delete('/:store_id', async (request, reply) => {
        try {
            const store_id = Number(request.params.store_id);

            await FASTIFY.prisma.stores.delete({
                where: {
                    store_id: store_id,
                },
            });

            return reply.code(200).send({
                message: `Deleted store with Store ID: ${store_id}`,
            });
        } catch (error) {
            return error.message;
        }
    });
    // ========== END STORE ROUTES ==========
}
