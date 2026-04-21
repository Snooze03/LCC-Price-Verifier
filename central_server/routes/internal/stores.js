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
            connection_type,
            db_user,
            db_password,
            host,
            port,
            db,
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
                'INSERT INTO config (store_id, connection_type, db_user, db_password, host, port, db, image_path) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
                [
                    store_id,
                    connection_type,
                    db_user,
                    db_password,
                    host,
                    port,
                    db,
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
        const [rows] = await FASTIFY.mysql.query(
            `SELECT s.*, c.connection_type, c.db_user, c.db_password, c.host, c.port, c.db, c.image_path
            FROM stores AS s
            INNER JOIN config AS c
            ON c.store_id = s.store_id;`,
        );

        return rows;
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
            connection_type,
            db_user,
            db_password,
            host,
            port,
            db,
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
                'UPDATE config SET connection_type = ?, db_user = ?, db_password = ?, host = ?, port = ?, db = ?, image_path = ? WHERE store_id = ?',
                [
                    connection_type,
                    db_user,
                    db_password,
                    host,
                    port,
                    db,
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

            return reply.code(400).send({
                message: 'Transaction Error',
                error: error.message,
            });
        } finally {
            connection.release();
        }
    });

    // Delete Store Accounts
    FASTIFY.delete('/:store_id', async (request, reply) => {
        const store_id = request.params.store_id;

        const [rows] = await FASTIFY.mysql.query(
            `DELETE FROM stores
                WHERE store_id = ?`,
            [store_id],
        );

        return rows;
    });
    // ========== END STORE ROUTES ==========
}
