import 'dotenv/config';
import { number, password } from '@inquirer/prompts';
import chalk from 'chalk';

import { api, addToken } from '#api/api';
import { MenuHeader } from './menu.js';
import { fetchConfig } from '#plugins/FP-config';

export async function Login(FASTIFY, options) {
    // central health check to fail fast if server is down
    await centralHealthCheck(FASTIFY);

    let store_id = null;
    let passWord = '';

    // Login Header
    console.clear();
    MenuHeader('Server Login', 'Central Server');

    while (true) {
        store_id = await number({
            message: 'Enter Store Number: ',
            validate: (value) => (value ? true : 'Please enter Password'),
        });

        passWord = await password({
            message: 'Enter Password: ',
            mask: '*',
            validate: (value) => (value ? true : 'Please enter Password'),
        });

        // send request
        try {
            const response = await api.post(`/pricever/login`, {
                store_id,
                password: passWord,
            });

            const access_token = response.data.body.access_token;

            // add token to axios response interceptor
            await addToken(access_token);
            // fetch store config
            await fetchConfig();

            break;
        } catch (error) {
            const { status, data } = error.response;
            console.clear();

            MenuHeader(chalk.red('Authentication Error'));
            console.log('- Status Code:', status);
            console.log('- Response:', data.message, '\n');

            console.log(chalk.yellow('Please try again'));

            continue;
        }
    }

    console.clear();
    MenuHeader(chalk.green('Logged in Successfully!'));
}

async function centralHealthCheck(FASTIFY) {
    try {
        // check if central server is up
        await api.get('/health');
    } catch (error) {
        FASTIFY.log.error({
            msg: 'Could not establish Connection to Central Server',
            code: error.code,
            err: {
                message: error.message,
            },
        });

        process.exit(0);
    }
}
