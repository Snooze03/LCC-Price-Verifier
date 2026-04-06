// Local store routes
export async function priceRoutes(FASTIFY, options) {
    // Route for fetching product price through local store database
    FASTIFY.get('/price/:barcode', async (request, reply) => {
        const { barcode } = request.params;

        const [rows] = await FASTIFY.mysql.query(
            `SELECT barcode.INUMBR, barcode.IUPC, price_table.description, price_table.price
            FROM barcode
            INNER JOIN price_table 
            ON barcode.INUMBR = price_table.primary_sku
            WHERE barcode.IUPC = ?`,
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
}
