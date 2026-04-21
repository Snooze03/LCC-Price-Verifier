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
    // Create new Store Accounts
    FASTIFY.post('/', async (request, reply) => {
        // get request data
        const {
            store_id,
            password,
            location,
            db_connection_string,
            db_user_name,
            db_password,
            image_path,
        } = request.body;

        // hash password
        const hashedPassword = await FASTIFY.hash(password);
        // create a connection pool
        const connection = await FASTIFY.mysql.getConnection();

        // transaction to create store with config
        try {
            await connection.query('START TRANSACTION');

            const [storeResult] = await connection.query(
                'INSERT INTO stores (store_id, password, location) VALUES (?, ?, ?)',
                [store_id, hashedPassword, location],
            );

            const [configResult] = await connection.query(
                'INSERT INTO config (store_id, db_connection_string, db_user_name, db_password, image_path) VALUES (?, ?, ?, ?, ?)',
                [
                    store_id,
                    db_connection_string,
                    db_user_name,
                    db_password,
                    image_path,
                ],
            );

            await connection.commit();

            return {
                message: 'Store and Configuration Created Successfully',
                data: {
                    store_affected: storeResult.affectedRows,
                    config_affected: configResult.affectedRows,
                    store_id: store_id,
                },
            };
        } catch (error) {
            await connection.rollback();

            return {
                error,
            };
        } finally {
            connection.release();
        }
    });

    // Fetch Stores with their Corresponding Configs
    FASTIFY.get('/', async (request, reply) => {
        const result = FASTIFY.prisma.stores.findMany();

        return result;
    });

    // Update Stores
    FASTIFY.patch('/:id', async (request, reply) => {
        // url parameter
        const id = request.params.id;

        // get request data
        const {
            store_id,
            password,
            location,
            db_connection_string,
            db_user_name,
            db_password,
            image_path,
        } = request.body;

        // hash password
        const hashedPassword = await FASTIFY.hash(password);
        // create a connection pool
        const connection = await FASTIFY.mysql.getConnection();

        // transaction to create store with config
        try {
            await connection.query('START TRANSACTION');

            const [storeResult] = await connection.query(
                'UPDATE stores SET store_id = ?, password = ?, location =? WHERE id = ?',
                [store_id, hashedPassword, location, id],
            );

            const [configResult] = await connection.query(
                'UPDATE config SET db_connection_string = ?, db_user_name = ?, db_password = ?, image_path = ? WHERE store_id = ?',
                [
                    db_connection_string,
                    db_user_name,
                    db_password,
                    image_path,
                    store_id,
                ],
            );

            await connection.commit();

            return {
                message: 'Store and Configuration Update Successfully',
                data: {
                    store_affected: storeResult.affectedRows,
                    config_affected: configResult.affectedRows,
                    store_id: store_id,
                },
            };
        } catch (error) {
            await connection.rollback();

            return {
                message: 'Transaction Error',
            };
        } finally {
            connection.release();
        }
    });

    // Delete Store Accounts
    FASTIFY.delete('/:store_id', async (request, reply) => {
        try {
            const store_id = Number(request.params.store_id);
            const result = await FASTIFY.prisma.stores.delete({
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
