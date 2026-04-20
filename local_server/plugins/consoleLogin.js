import { number, password } from '@inquirer/prompts';
import { api, addToken } from '../api/api.js';
import 'dotenv/config';

export async function consoleLogin(FASTIFY, options) {
    let store_id = null;
    let passWord = '';

    while (true) {
        console.log('---------- CENTRAL SERVER AUTHENTICATION ----------');

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
            break;
        } catch (error) {
            const { status, data } = error.response;
            console.clear();

            console.log('---------- AUTHENTICATION ERROR ----------');
            console.log('- Status:', status);
            console.log('- Response:', data.message, '\n');
            continue;
        }
    }

    console.log('---------- AUTHENTICATION SUCCESS ----------');
}
