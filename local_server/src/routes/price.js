// Local store routes
export async function priceRoutes(FASTIFY, options) {
    // Route for fetching product price through local store database
    FASTIFY.get('/price/:barcode', async (request, reply) => {
        const { barcode } = request.params;

        const [rows] = await FASTIFY.mysql.query(
            `SELECT invupc.INUMBR, invupc.IUPC, best_price.description, best_price.price
            FROM invupc
            INNER JOIN best_price 
            ON invupc.INUMBR = best_price.primary_sku
            WHERE invupc.IUPC = ?`,
            [barcode],
        );

        if (!rows || rows.length === 0) {
            return reply.code(404).send({
                error: 'Not Found',
                message: `No product found with barcode ${barcode}`,
            });
        }

        const item = rows[0];

        return {
            description: item.description,
            price: parseFloat(item.price).toFixed(2),
        };
    });

    FASTIFY.log.info('Routes: Price Routes Registered');
}
