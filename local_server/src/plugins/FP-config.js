import path from 'node:path';
import { writeFile, access } from 'node:fs/promises';
import { readFile, constants } from 'node:fs/promises';
import fastifyPlugin from 'fastify-plugin';

import { api } from '#api/api';

// Root system dir
const rootDir = process.cwd();
const configPath = path.join(rootDir, 'config.json');

async function configFP(FASTIFY, options) {
    // Parse raw config
    const rawJson = await readFile(configPath, 'utf8');
    const parsedJson = JSON.parse(rawJson);

    FASTIFY.decorate('config', parsedJson);
}

export async function checkConfig() {
    // checks if the server already has a config
    try {
        await access(configPath, constants.F_OK);
        return true;
    } catch {
        return false;
    }
}

export async function fetchConfig() {
    // fetches the logged in store's config
    try {
        const response = await api.get('pricever/config');
        const config = JSON.stringify(response.data, null, 4);

        await writeFile('./config.json', config, 'utf8');

        console.log('Config: Updated config file');
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}

export default fastifyPlugin(configFP);
