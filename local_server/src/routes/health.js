export function healthRoutes(FASTIFY, options) {
    FASTIFY.get('/health', async (request, reply) => {
        return { status: 'ok' };
    });
}
