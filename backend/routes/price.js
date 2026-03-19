export default async function itemRoutes(FASTIFY, options) {
    FASTIFY.get('/price/:barcode', async (request, reply) => {
        const { barcode } = request.params;

        const [rows] = await FASTIFY.mysql.query(
            'SELECT description, price FROM price_table WHERE primary_sku =?',
            [barcode],
        );

        const item = rows[0];

        return {
            description: item.description,
            price: parseFloat(item.price).toFixed(2),
        };
    });
}
