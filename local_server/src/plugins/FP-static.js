import { homedir } from 'node:os';
import { readdir, mkdir, stat } from 'node:fs/promises';
import { extname, join } from 'node:path';

import fastifyStatic from '@fastify/static';
import fastifyPlugin from 'fastify-plugin';

async function fastifyStaticFP(FASTIFY, options) {
    const { image_path } = FASTIFY.config;
    const imageRoot = join(homedir(), image_path);
    const routePrefix = '/images';
    const imageFileExtensions = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'];

    // --- 1. STARTUP CHECK ---
    try {
        await mkdir(imageRoot, { recursive: true });

        // New logic to check if empty on startup
        const files = await readdir(imageRoot);
        const validExtensions = imageFileExtensions.map((ext) => `.${ext}`);
        const images = files.filter((file) =>
            validExtensions.includes(extname(file).toLowerCase()),
        );

        if (images.length === 0) {
            // This will show up in your terminal logs (yellow/red)
            FASTIFY.log.warn(
                `STORAGE WARNING: Directory is empty or contains no valid images: ${imageRoot}`,
            );
        } else {
            FASTIFY.log.info(
                `Storage directory verified: ${imageRoot} (${images.length} images found)`,
            );
        }
    } catch (err) {
        FASTIFY.log.error(`PLUGIN STARTUP ERROR: ${err.message}`);
    }

    // --- 2. REGISTER STATIC PROVIDER ---
    FASTIFY.register(fastifyStatic, {
        root: imageRoot,
        prefix: routePrefix,
        dotfiles: 'ignore',
        acceptanceRanges: true,
        immutable: true,
        index: false,
        setHeaders: (res, filePath) => {
            const fileExtension = extname(filePath).slice(1).toLowerCase();
            if (imageFileExtensions.includes(fileExtension)) {
                res.setHeader(
                    'Cache-Control',
                    'public, max-age=2592000, immutable',
                );
                res.setHeader('X-Content-Type-Options', 'nosniff');
            }
        },
    });

    // --- 3. LIST IMAGES ROUTE ---
    FASTIFY.get(`${routePrefix}/list`, async (request, reply) => {
        try {
            const stats = await stat(imageRoot);
            if (!stats.isDirectory()) {
                throw new Error('Path is a file, not a directory');
            }

            const files = await readdir(imageRoot);

            const validExtensions = imageFileExtensions.map((ext) => `.${ext}`);
            const images = files.filter((file) =>
                validExtensions.includes(extname(file).toLowerCase()),
            );

            // --- ADDED CHECK HERE ---
            if (images.length === 0) {
                return reply
                    .status(404) // You can use 200 if you don't want it to be a hard "error"
                    .send({
                        success: false,
                        message: 'No images found in the directory',
                        images: [],
                    });
            }

            return { success: true, images };
        } catch (err) {
            FASTIFY.log.error(`Route Error (list): ${err.message}`);

            if (err.code === 'ENOENT') {
                return reply
                    .status(404)
                    .send({ error: 'Image directory does not exist' });
            }
            return reply
                .status(500)
                .send({ error: 'Could not access image storage' });
        }
    });

    // --- 4. OPTIONAL UPLOAD ROUTE STRUCTURE ---
    // This demonstrates where to put the "Auto-Create" logic during usage
    FASTIFY.post(`${routePrefix}/upload`, async (request, reply) => {
        try {
            // If the folder was deleted while server was running, this brings it back
            await mkdir(imageRoot, { recursive: true });

            // Your upload logic (e.g. fastify-multipart) would go here
            return { status: 'ready for upload' };
        } catch (err) {
            FASTIFY.log.error(`Upload Error: ${err.message}`);
            return reply
                .status(507)
                .send({ error: 'Server storage unavailable' });
        }
    });

    FASTIFY.log.info('Plugins: Fastify Static Image Registered');
}

export default fastifyPlugin(fastifyStaticFP);
