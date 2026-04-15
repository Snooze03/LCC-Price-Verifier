export async function storeRoutes(FASTIFY, options) {
    FASTIFY.addHook('onRequest', async (request, reply) => {
        try {
            await FASTIFY.authenticate(request, reply);
        } catch (error) {
            reply.send(error);
        }
    });

    // fetches all records from a table
    async function selectAll(table) {
        const [result] = await FASTIFY.mysql.query(
            `SELECT *
            FROM ${table}`,
        );

        return result;
    }

    // ========== STORE ROUTES ==========
    // Create new Store Accounts
    FASTIFY.post('/', async (request, reply) => {
        const { store_id, password, location } = request.body;

        const [rows] = await FASTIFY.mysql.query(
            `INSERT INTO stores
                VALUES (?, ?, ?)`,
            [store_id, password, location],
        );

        return rows;
    });

    // Read Stores
    FASTIFY.get('/', async (request, reply) => {
        // To add:
        // 1. Error handlers
        // 2. Pagination
        return selectAll('stores');
    });

    // Update Stores
    FASTIFY.patch('/:store_id', async (request, reply) => {
        const store_id = request.params.store_id;
        const { password, location } = request.body;

        const [rows] = await FASTIFY.mysql.query(
            `UPDATE stores
            SET password = ?, location = ?
            WHERE store_id = ?`,
            [password, location, store_id],
        );

        return rows;
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

    FASTIFY.get('/config', async (request, reply) => {
        // To add:
        // 1. Error handlers
        // 2. Pagination
        return selectAll('config');
    });
}
