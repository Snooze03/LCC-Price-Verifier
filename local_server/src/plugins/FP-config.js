import path from 'node:path';
import { writeFile } from 'node:fs/promises';
import { readFile } from 'node:fs/promises';
import fastifyPlugin from 'fastify-plugin';

import { api } from '#api/api';

async function configFP(FASTIFY, options) {
    // Fetch config
    try {
        const response = await api.get('pricever/config');
        const config = JSON.stringify(response.data, null, 4);

        await writeFile('./config.json', config, 'utf8');
        FASTIFY.log.info('Config: Updated config file');
    } catch (error) {
        FASTIFY.log.error(error);
    }

    // Root system dir
    const rootDir = process.cwd();
    const configPath = path.join(rootDir, 'config.json');

    // Parse raw config
    const rawJson = await readFile(configPath, 'utf8');
    const parsedJson = JSON.parse(rawJson);

    FASTIFY.decorate('config', parsedJson);
}

export default fastifyPlugin(configFP);
