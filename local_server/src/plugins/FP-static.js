import { homedir } from 'node:os';
import { readdir } from 'node:fs/promises';
import { extname, join } from 'node:path';

import fastifyStatic from '@fastify/static';
import fastifyPlugin from 'fastify-plugin';

async function fastifyStaticFP(FASTIFY, options) {
    const { image_path } = FASTIFY.config;
    const imageRoot = join(homedir(), image_path);

    // Route Prefix
    const routePrefix = '/images';

    const imageFileExtension = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'];

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

    FASTIFY.get(`${routePrefix}/list`, async (request, reply) => {
        try {
            const files = await readdir(imageRoot);

            // Filter for only valid image extensions
            const validExtensions = [
                '.jpg',
                '.jpeg',
                '.png',
                '.gif',
                '.webp',
                '.svg',
            ];
            const images = files.filter((file) =>
                validExtensions.includes(extname(file).toLowerCase()),
            );

            return { images };
        } catch (err) {
            FASTIFY.log.error(err);
            return reply.status(500).send({ error: 'Could not list images' });
        }
    });

    FASTIFY.log.info('Plugins: Fastify Static Image Registered');
}

export default fastifyPlugin(fastifyStaticFP);
