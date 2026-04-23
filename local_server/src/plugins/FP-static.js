import { dirname, extname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import fastifyStatic from '@fastify/static';
import fastifyPlugin from 'fastify-plugin';

async function fastifyStaticFP(FASTIFY, options) {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);

    // To add:
    // [ ] Use image path from config
    const imageRoot = join(__dirname, '../../images');

    // Route Prefix
    const routePrefix = '/images';

    FASTIFY.register(fastifyStatic, {
        root: imageRoot,
        prefix: routePrefix,

        // Security
        dotfiles: 'ignore',
        acceptanceRanges: true,
        immutable: true,
        index: false,

        // Performance and Caching
        setHeaders: (res, filePath) => {
            const fileExtension = extname(filePath).slice(1).toLowerCase();
            const imageFileExtension = [
                'jpg',
                'jpeg',
                'png',
                'gif',
                'webp',
                'svg',
            ];

            // Checks if file extension is valid
            if (imageFileExtension.includes(fileExtension)) {
                res.setHeader(
                    'Cache-Control',
                    'public, max-age=2592000, immutable',
                );
                res.setHeader('X-Content-Type-Options', 'nosniff');
            }
        },
    });

    FASTIFY.log.info('Plugins: Fastify Static Image Registered');
}

export default fastifyPlugin(fastifyStaticFP);
