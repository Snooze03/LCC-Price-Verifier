import { dirname, extname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import fastifyStatic from '@fastify/static';
import fastifyPlugin from 'fastify-plugin';

async function fastifyStaticFP(FASTIFY, options) {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);

    const imageRoot = join(__dirname, '../../images');
    console.log(imageRoot);
    const prefix = '/images';

    FASTIFY.register(fastifyStatic, {
        root: imageRoot,
        prefix,

        // Security
        dotfiles: 'ignore',
        acceptanceRanges: true,
        immutable: true,
        index: false,

        // Performance and Caching
        setHeaders: (res, filePath) => {
            const ext = extname(filePath).slice(1).toLocaleLowerCase();
            const imagesExt = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'];

            if (imagesExt.includes(ext)) {
                res.setHeader(
                    'Cache-Control',
                    'public, max-age=2592000, immutable',
                );
                res.setHeader('X-Content-Type-Options', 'nosniff');
            }
        },
    });
}

export default fastifyPlugin(fastifyStaticFP);
