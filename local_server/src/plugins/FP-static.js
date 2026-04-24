import { homedir } from 'node:os';
import { extname, join } from 'node:path';

import fastifyStatic from '@fastify/static';
import fastifyPlugin from 'fastify-plugin';

async function fastifyStaticFP(FASTIFY, options) {
    const { image_path } = FASTIFY.config;
    const imageRoot = join(homedir(), image_path);

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
